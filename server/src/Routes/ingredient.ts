import express from "express"
import { validationResult } from "express-validator"
import { ingredientValidator } from "../Validator/ingredientValidator"
import { Ingredient } from "../Models/Ingredient"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/ingredients", async (req: express.Request, res: express.Response) => {
	const ingredients = await Ingredient.find()
	res.json({ status: 200, data: ingredients })
	return
})

router.post("/ingredients", ingredientValidator, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			data: errors
		})
		return
	}

	const { quantity, name, important }: Ingredient = req.body

	try {
		const ingredient = new Ingredient()

		ingredient.quantity = quantity
		ingredient.name = name
		ingredient.important = important
		const result = await Ingredient.save(ingredient)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.get("/ingredients/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const ingredient = await Ingredient.findOne({
			where: {
				id: id
			}
		})
		if (!ingredient) throw Error("The ingredient was not found")
		res.json({ status: 200, data: ingredient })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

router.put("/ingredients/:id", ingredientValidator, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			message: errors
		})
		return
	}
	const { quantity, name, important }: Ingredient = req.body

	try {
		const ingredient = await Ingredient.findOne({
			where: {
				id: id
			}
		})
		if (!ingredient) throw Error("The ingredient was not found")

		ingredient.quantity = quantity
		ingredient.name = name
		ingredient.important = important
		const result = await Ingredient.save(ingredient)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.delete("/ingredients/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const ingredient = await Ingredient.findOne({
			where: {
				id: id
			}
		})
		if (!ingredient) throw Error("The ingredient was not found")
		res.json({ status: 200, data: "Ingredient has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

export default router
