import express from "express"
import { validationResult } from "express-validator"
import { ingredientValidator } from "../Validator/ingredientValidator"
import { Ingredient } from "../Models/Ingredient"
import { isAdmin } from "../Helpers/verify"
import jwtExpress from "express-jwt"
import { secret } from "../keys"
import { Stock } from "../Models/Stock"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/ingredients", async (req: express.Request, res: express.Response) => {
	const ingredients = await Ingredient.find({ relations: ["stock"] })
	res.json({ status: 200, data: ingredients })
	return
})

router.post(
	"/ingredients",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	ingredientValidator,
	isAdmin,
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			res.status(401).send({
				status: 401,
				data: errors
			})
			return
		}

		const { stock, name, important }: Ingredient = req.body

		try {
			const ingredient = new Ingredient()

			ingredient.name = name
			ingredient.important = important
			const newStock = await Stock.save(stock)
			ingredient.stock = newStock
			const result = await Ingredient.save(ingredient)
			res.json({ status: 200, data: result })
			return
		} catch (error) {
			res.json({ status: 400, data: error })
			return
		}
	}
)

router.get(
	"/ingredients/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	isAdmin,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params
		try {
			const ingredient = await Ingredient.findOne(id)
			if (!ingredient) throw Error("The ingredient was not found")
			res.json({ status: 200, data: ingredient })
			return
		} catch (error) {
			res.status(400).send({ status: 400, data: error })
			return
		}
	}
)

router.put(
	"/ingredients/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	ingredientValidator,
	isAdmin,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			res.status(401).send({
				status: 401,
				message: errors
			})
			return
		}
		const { stock, name, important }: Ingredient = req.body

		try {
			const ingredient = await Ingredient.findOne(id, { relations: ["stock"] })
			if (!ingredient) throw Error("The ingredient was not found")

			ingredient.name = name
			ingredient.important = important

			const updateStock = await Stock.findOne(ingredient.stock.id)
			updateStock.quantity = stock.quantity
			Stock.save(updateStock)
			ingredient.stock = updateStock
			const result = await Ingredient.save(ingredient)
			res.json({ status: 200, data: result })
			return
		} catch (error) {
			console.log(error)

			res.json({ status: 400, data: error })
			return
		}
	}
)

router.delete(
	"/ingredients/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	isAdmin,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params
		try {
			const ingredient = await Ingredient.findOne({
				where: {
					id: id
				}
			})
			if (!ingredient) throw Error("The ingredient was not found")
			Ingredient.delete(ingredient)
			res.json({ status: 200, data: "Ingredient has been deleted" })
			return
		} catch (error) {
			res.status(400).send({ status: 400, data: error })
			return
		}
	}
)

export default router
