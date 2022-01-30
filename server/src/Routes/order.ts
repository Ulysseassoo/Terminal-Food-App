import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { orderValidator } from "../Validator/orderValidator"
import { State } from "../Models/State"
import { Terminal } from "../Models/Terminal"
import { User } from "../Models/User"
import { Product } from "../Models/Product"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({ relations: ["products", "products.ingredients"], order: { id: "DESC" } })
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

	const { totalAmount, terminal, user, products }: Order = req.body

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

		const orderUser = await User.findOne({
			where: {
				id: user
			}
		})

		order.totalAmount = totalAmount
		order.state = orderState
		order.terminal = orderTerminal
		if (user) {
			order.user = orderUser
		}
		for (let i = 0; i < products.length; i++) {
			const product = products[i]
			if (product.custom) {
				product.id = null
			}
			product.ingredients &&
				product.ingredients.forEach((ingredient) => {
					ingredient.quantity -= 1
				})
			product.has = [order]
			await Product.save(product)
		}
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
		if (!order) throw Error
		res.json({ status: 200, data: order })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The Order doesn't exist" })
		return
	}
})

router.put("/orders/:id", orderValidator, async (req: express.Request, res: express.Response) => {
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
		if (!order) throw Error
		order.totalAmount = totalAmount
		order.terminal = orderTerminal
		order.user = orderUser
		order.state = orderState
		const result = await Order.save(order)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The order doesn't exist" })
		return
	}
})

router.delete("/orders/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const order = await Order.findOne({
			where: {
				id: id
			}
		})
		if (!order) throw Error
		res.json({ status: 200, data: "Order has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The category doesn't exist" })
		return
	}
})

export default router
