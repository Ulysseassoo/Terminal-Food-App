import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { orderValidator } from "../Validator/orderValidator"
import { State } from "../Models/State"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/orders", async (req: express.Request, res: express.Response) => {
	const orders = await Order.find({ relations: ["has"] })
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

	const { totalAmount } = req.body

	try {
		const order = new Order()
		order.totalAmount = totalAmount
		const orderState = await State.findOne({
			where: {
				id: 0
			}
		})
		order.state = orderState
		const result = await Category.save(category)
		res.json({ status: 200, result: result })
		return
	} catch (error) {
		res.json({ status: 400, result: error })
		return
	}
})

router.get("/categories/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const category = await Category.findOne({
			where: {
				id: id
			},
			relations: ["products"]
		})
		if (!category) throw Error
		res.json({ status: 200, result: category })
		return
	} catch (error) {
		res.status(400).send({ status: 400, result: "The category doesn't exist" })
		return
	}
})

router.put("/categories/:id", categoryValidator, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			message: errors
		})
		return
	}
	const { name } = req.body
	try {
		const category = await Category.findOne({
			where: {
				id: id
			},
			relations: ["products"]
		})
		if (!category) throw Error
		category.name = name
		const result = await Category.save(category)
		res.json({ status: 200, result: result })
		return
	} catch (error) {
		res.status(400).send({ status: 400, result: "The category doesn't exist" })
		return
	}
})

router.delete("/categories/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const category = await Category.findOne({
			where: {
				id: id
			}
		})
		if (!category) throw Error
		res.json({ status: 200, result: "Category has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, result: "The category doesn't exist" })
		return
	}
})

export default router
