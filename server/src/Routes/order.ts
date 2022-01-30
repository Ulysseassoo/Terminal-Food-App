import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { orderValidator } from "../Validator/orderValidator"
import { State } from "../Models/State"
import { Terminal } from "../Models/Terminal"
import { User } from "../Models/User"
import { Product } from "../Models/Product"

type createOrder = {
	totalAmount: number
	terminal_unique_id: string
	user_id: number
	products: Product[]
	state_id?: number
}

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({ relations: ["products", "products.ingredients"] })
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

	const { totalAmount, terminal_unique_id, user_id, products }: createOrder = req.body

	try {
		const order = new Order()

		const orderState = await State.findOne({
			where: {
				id: 1
			}
		})

		const terminal = await Terminal.findOne({
			where: {
				unique_id: terminal_unique_id
			}
		})

		const user = await User.findOne({
			where: {
				id: user_id
			}
		})

		order.totalAmount = totalAmount
		order.state = orderState
		order.terminal = terminal
		if (user) {
			order.user = user
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
	const { totalAmount, terminal_unique_id, user_id, state_id }: createOrder = req.body
	const terminal = await Terminal.findOne({
		where: {
			unique_id: terminal_unique_id
		}
	})

	const user = await User.findOne({
		where: {
			id: user_id
		}
	})

	const state = await State.findOne({
		where: {
			id: state_id
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
		order.terminal = terminal
		order.user = user
		order.state = state
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
