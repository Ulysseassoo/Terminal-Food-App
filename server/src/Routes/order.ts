import express from "express"
import jwtExpress from "express-jwt"
import dotenv from "dotenv"
import path from "path"
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

const router = express.Router()

dotenv.config({
	path: path.resolve(__dirname, "../config.env")
})

const secret = process.env.JWT_SECRET

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({
		relations: ["productToOrders", "productToOrders.product", "productToOrders.product.ingredients", "terminal", "state"],
		order: { id: "DESC" }
	})
	res.json({ status: 200, data: orders })
	return
})

router.post("/orders", orderValidator, async (req: express.Request, res: express.Response) => {
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
		// // Check if there are enough products quantity
		// for (let i = 0; i < productToOrders.length; i++) {
		// 	const productToOrder = productToOrders[i]
		// 	for (let x = 0; x < productToOrder.product.ingredients.length; x++) {
		// 		const ingredient = productToOrder.product.ingredients[x]
		// 		let oldStock = await Stock.findOne({
		// 			where: {
		// 				ingredient: ingredient.id
		// 			}
		// 		})
		// 		if (oldStock.quantity === 0) throw Error("There is not enough quantity to do your order. Please reconsider.")
		// 		oldStock.quantity -= productToOrder.quantity
		// 		const newStock = await Stock.save(oldStock)
		// 		req.io.emit("changedStock", { data: newStock })
		// 		if (newStock.quantity === 0) {
		// 			req.io.emit("unavailableProduct", {
		// 				message: "This product is not available anymore",
		// 				data: { ...productToOrder.product, available: false }
		// 			})
		// 		}
		// 	}
		// }

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
				if (oldStock.quantity === 0) throw Error("There is not enough quantity to do your order. Please reconsider.")
				oldStock.quantity -= productToOrder.quantity
				const newStock = await Stock.save(oldStock)
				req.io.emit("changedStock", { data: newStock })
				if (newStock.quantity === 0) {
					req.io.emit("unavailableProduct", {
						message: "This product is not available anymore",
						data: { ...productToOrder.product, available: false }
					})
				}
			}
			totalAmount += productToOrder.product.price * productToOrder.quantity
			if (productToOrder.product.custom) {
				productToOrder.product.id = null
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
		console.log(req.user)
		if (req.user) {
			await transporter.sendMail({
				from: "pizza-restaurant@official.fr",
				to: req.user.email,
				subject: `New Order ${result.id}`,
				html: "Mon contenu"
			})
		}
		return
	} catch (error) {
		console.log(error)
		res.json({ status: 400, data: error.message })
		return
	}
})

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

router.put("/orders/:id", isKitchen, async (req: express.Request, res: express.Response) => {
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

router.delete("/orders/:id", isAdmin, async (req: express.Request, res: express.Response) => {
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
