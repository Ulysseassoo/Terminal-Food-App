import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { orderValidator } from "../Validator/orderValidator"
import { State } from "../Models/State"
import { Terminal } from "../Models/Terminal"
import { User } from "../Models/User"
import { Product } from "../Models/Product"
import { isAdmin, isKitchen, isNotUser } from "../Helpers/verify"
import { ProductToOrder } from "../Models/ProductToOrder"
import { Ingredient } from "../Models/Ingredient"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({
		relations: ["productToOrders", "productToOrders.product", "productToOrders.product.ingredients", "terminal"],
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

	const { totalAmount, terminal, user, productToOrders }: Order = req.body

	try {
		const order = new Order()

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

		order.totalAmount = totalAmount
		order.state = orderState
		order.terminal = orderTerminal
		if (user) {
			const orderUser = await User.findOne({
				where: {
					id: user
				}
			})
			order.user = orderUser
		}
		for (let i = 0; i < productToOrders.length; i++) {
			const productToOrder = productToOrders[i]
			if (productToOrder.product.custom) {
				productToOrder.product.id = null
			}
			console.log(productToOrder.product.ingredients)
			productToOrder.product.ingredients &&
				productToOrder.product.ingredients.forEach((ingredient) => {
					ingredient.quantity -= 1
					Ingredient.save(ingredient)
				})
			await Product.save(productToOrder.product)
		}
		order.productToOrders = productToOrders
		const result = await Order.save(order)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
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

router.put("/orders/:id", orderValidator, isKitchen, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			message: errors
		})
		return
	}
	const { totalAmount, terminal, user, state }: Order = req.body

	const orderTerminal = await Terminal.findOne({
		where: {
			unique_id: terminal
		}
	})

	const orderUser = await User.findOne({
		where: {
			id: user
		}
	})

	const orderState = await State.findOne({
		where: {
			id: state
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
		res.json({ status: 200, data: result })
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
