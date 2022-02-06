import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { productValidator } from "../Validator/productValidator"
import { Product } from "../Models/Product"
import { Category } from "../Models/Category"
import { isAdmin } from "../Helpers/verify"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/products", async (req: express.Request, res: express.Response) => {
	const products = await Product.find({ relations: ["ingredients", "category"] })
	res.json({ status: 200, data: products })
	return
})

router.post("/products", productValidator, isAdmin, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			data: errors
		})
		return
	}

	const { price, name, description, custom, calories, category, ingredients }: Product = req.body

	try {
		const product = new Product()

		const productCategory = await Category.findOne({
			where: {
				id: category
			}
		})

		product.price = price
		product.name = name
		product.description = description
		product.category = productCategory
		product.custom = custom
		product.calories = calories
		product.ingredients = [...ingredients]
		const result = await Product.save(product)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.get("/products/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const product = await Order.findOne({
			where: {
				id: id
			},
			relations: ["ingredients"]
		})
		if (!product) throw Error("The product was not found")
		res.json({ status: 200, data: product })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

router.put("/products/:id", productValidator, isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).send({
			status: 401,
			message: errors
		})
		return
	}
	const { price, name, description, custom, calories, category, ingredients }: Product = req.body

	try {
		const product = await Product.findOne({
			where: {
				id: id
			}
		})

		if (!product) throw Error("Product was not found")

		const productCategory = await Category.findOne({
			where: {
				id: category
			}
		})

		product.price = price
		product.name = name
		product.description = description
		product.category = productCategory
		product.custom = custom
		product.calories = calories
		product.ingredients = [...ingredients]
		const result = await Product.save(product)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.delete("/products/:id", isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const product = await Product.findOne({
			where: {
				id: id
			}
		})
		if (!product) throw Error("The product doesn't exist")
		res.json({ status: 200, data: "Product has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: error })
		return
	}
})

export default router
