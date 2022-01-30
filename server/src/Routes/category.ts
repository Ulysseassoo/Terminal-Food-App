import express from "express"
import { Category } from "../Models/Category"
import { v4 as uuidv4 } from "uuid"
import { validationResult } from "express-validator"
import { categoryValidator } from "../Validator/categoryValidator"
import { isAdmin } from "../Helpers/verify"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/categories", async (req: express.Request, res: express.Response) => {
	const categories = await Category.find({ relations: ["products"] })
	res.json({ status: 200, data: categories })
	return
})

router.post("/categories", categoryValidator, isAdmin, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			data: errors
		})
		return
	}

	const { name } = req.body

	try {
		const category = new Category()
		category.name = name
		const result = await Category.save(category)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
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
		res.json({ status: 200, data: category })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The category doesn't exist" })
		return
	}
})

router.put("/categories/:id", categoryValidator, isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			data: errors
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
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The category doesn't exist" })
		return
	}
})

router.delete("/categories/:id", isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const category = await Category.findOne({
			where: {
				id: id
			}
		})
		if (!category) throw Error
		res.json({ status: 200, data: "Category has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The category doesn't exist" })
		return
	}
})

export default router
