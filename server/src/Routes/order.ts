import express, { NextFunction } from "express"
import jwtExpress from "express-jwt"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { orderValidator } from "../Validator/orderValidator"
import { State } from "../Models/State"
import { Terminal } from "../Models/Terminal"
import { User } from "../Models/User"
import { Product } from "../Models/Product"
import { isAdmin, isKitchen } from "../Helpers/verify"
import { Stock } from "../Models/Stock"
import { transporter } from "../Helpers/MailTransporter"
import { Ingredient } from "../Models/Ingredient"
import { ProductToOrder } from "../Models/ProductToOrder"
import { users } from ".."
import { secret } from "../keys"

const router = express.Router()

//  ------------------------------------------ FUNCTIONS ----------------------------------------------
const renderProductsUnavailable = async (ingredientId: number, req: express.Request) => {
	const products = await Product.find({ relations: ["ingredients"] })
	for (const product of products) {
		if (product.ingredients.find((ingredient) => ingredient.id === ingredientId) && !product.custom) {
			product.available = false
			const result = await Product.save(product)
			// Then we send the request by socket
			req.io.emit("unavailableProduct", {
				message: `This product : ${result.name} is not available anymore`,
				data: result
			})
		}
	}
}

const checkIngredientsQuantity = async (productToOrders: ProductToOrder[]) => {
	// Check total ingredients in the order by the quantity for each order
	// Then get each ingredient and substract it and if everything is okay then we can substract it
	const ingredients = await Ingredient.find({ relations: ["stock"] })
	for (const ingredient of ingredients) {
		for (const productToOrder of productToOrders) {
			for (const productIngredient of productToOrder.product.ingredients) {
				if (productIngredient.id === ingredient.id) {
					if (ingredient.stock.quantity < 0) return false
					ingredient.stock.quantity -= productToOrder.quantity
					if (ingredient.stock.quantity < 0) return false
				}
			}
		}
	}
	return true
}

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({
		relations: ["productToOrders", "productToOrders.product", "productToOrders.product.ingredients", "terminal", "state"],
		order: { id: "DESC" }
	})
	res.json({ status: 200, data: orders })
	return
})

router.post(
	"/orders",
	jwtExpress({ secret: secret, algorithms: ["HS256"], credentialsRequired: false }),
	orderValidator,
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			res.status(401).send({
				status: 401,
				data: errors
			})
			return
		}

		const { terminal, productToOrders }: Order = req.body

		try {
			const order = new Order()
			let totalAmount = 0
			const orderState = await State.findOne({
				where: {
					id: 1
				}
			})

			const orderTerminal = await Terminal.findOne({
				where: {
					unique_id: terminal
				}
			})

			order.state = orderState
			order.terminal = orderTerminal
			if (req.user) {
				const orderUser = await User.findOne({
					where: {
						id: req.user.id
					}
				})
				order.user = orderUser
			}
			const isStockEnough = await checkIngredientsQuantity(productToOrders)
			if (!isStockEnough) throw Error("There is not enough quantity to do your order. Please reconsider.")

			for (let i = 0; i < productToOrders.length; i++) {
				const productToOrder = productToOrders[i]
				for (let x = 0; x < productToOrder.product.ingredients.length; x++) {
					const ingredient = productToOrder.product.ingredients[x]
					let oldStock = await Stock.findOne({
						where: {
							ingredient: ingredient.id
						},
						relations: ["ingredient"]
					})
					oldStock.quantity -= productToOrder.quantity
					const newStock = await Stock.save(oldStock)
					req.io.emit("changedStock", { data: newStock })
					if (newStock.quantity === 0) {
						// Get all products that have this product and render them unavailable
						renderProductsUnavailable(newStock.id, req)
						for (const user of users) {
							if (user.user_role === "admin") {
								req.io.to(user.socket_id).emit("unavailableIngredient", { message: `This product: ${newStock.ingredient.name} quantity reached 0` })
							}
						}
						await transporter.sendMail({
							from: "pizza-restaurant@official.fr",
							to: "admin@pizza-restaurant.fr",
							subject: `Product :  ${newStock.ingredient.name}`,
							html: "It is not available anymore !"
						})
					}
				}
				totalAmount += productToOrder.product.price * productToOrder.quantity
				if (productToOrder.product.custom) {
					productToOrder.product.id = null
					productToOrder.product.image = null
					await Product.save(productToOrder.product)
				}
			}
			order.totalAmount = totalAmount
			order.productToOrders = productToOrders
			const result = await Order.save(order)
			res.status(201).json({ status: 201, data: result })
			req.io.emit("newOrder", {
				data: order
			})
			const user = await User.findOne(req.user.id)
			if (user !== undefined && user.role === "") {
				await transporter.sendMail({
					from: "pizza-restaurant@official.fr",
					to: user.email,
					subject: `New Order from pizza Restaurant`,
					html: `Here is your order details: \n Order n #${result.id} \n At ${new Date(result.createdAt).toDateString()} \n Price: ${
						result.totalAmount
					} \n Products bought: ${result.productToOrders.map((order) => `${order.product.name} * ${order.quantity}`)} \n`
				})
			}
			return
		} catch (error) {
			console.log(error)
			res.status(200).json({ status: 200, data: error.message })
			return
		}
	}
)

router.get("/orders/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const order = await Order.findOne({
			where: {
				id: id
			},
			relations: ["has", "has.ingredients"]
		})
		if (!order) throw Error("The Order doesn't exist")
		res.json({ status: 200, data: order })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

router.put("/orders/:id", jwtExpress({ secret: secret, algorithms: ["HS256"] }), isKitchen, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const { totalAmount, terminal, state }: Order = req.body

	const orderTerminal = await Terminal.findOne({
		where: {
			unique_id: terminal.unique_id
		}
	})

	const orderUser = await User.findOne({
		where: {
			id: req.user.id
		}
	})

	const orderState = await State.findOne({
		where: {
			id: state.id
		}
	})

	try {
		const order = await Order.findOne({
			where: {
				id: id
			}
		})
		if (!order) throw Error("The order doesn't exist")
		order.totalAmount = totalAmount
		order.terminal = orderTerminal
		order.user = orderUser
		order.state = orderState
		const result = await Order.save(order)
		req.io.emit("modifiedOrder", {
			data: order
		})
		res.status(200).json({ status: 200, data: result })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

router.delete("/orders/:id", jwtExpress({ secret: secret, algorithms: ["HS256"] }), isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const order = await Order.findOne({
			where: {
				id: id
			}
		})
		if (!order) throw Error("The order doesn't exist")
		res.json({ status: 200, data: "Order has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

export default router
