import express from "express"
import { Order } from "../Models/Order"
import { validationResult } from "express-validator"
import { productValidator } from "../Validator/productValidator"
import { Product } from "../Models/Product"
import { Category } from "../Models/Category"
import { isAdmin } from "../Helpers/verify"
import { Ingredient } from "../Models/Ingredient"
import jwtExpress from "express-jwt"
import { secret } from "../keys"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/products", async (req: express.Request, res: express.Response) => {
	const products = await Product.find({ relations: ["ingredients", "category", "image"], order: { id: "ASC" } })
	res.json({ status: 200, data: products })
	return
})

router.post("/products", productValidator, async (req: express.Request, res: express.Response) => {
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

		const productCategory = await Category.findOne(category.id)

		product.price = price
		product.name = name
		product.description = description
		product.category = productCategory
		product.custom = custom
		product.calories = calories
		product.ingredients = []

		for (const ingredient of ingredients) {
			const checkIngredient = await Ingredient.findOne(ingredient.id)
			product.ingredients = [...product.ingredients, checkIngredient]
		}

		const result = await Product.save(product)
		res.json({ status: 201, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error.message || error })
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

router.put(
	"/products/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	productValidator,
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
		const { price, name, description, custom, calories, category, ingredients }: Product = req.body

		try {
			const product = await Product.findOne(id)

			if (!product) throw Error("Product was not found")

			const productCategory = await Category.findOne(category.id)

			product.price = price
			product.name = name
			product.description = description
			product.category = productCategory
			product.custom = custom
			product.calories = calories
			product.ingredients = []

			for (const ingredient of ingredients) {
				const checkIngredient = await Ingredient.findOne(ingredient.id)
				product.ingredients = [...product.ingredients, checkIngredient]
			}

			const result = await Product.save(product)
			res.json({ status: 200, data: result })
			return
		} catch (error) {
			res.json({ status: 400, data: error })
			return
		}
	}
)

router.delete(
	"/products/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	isAdmin,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params
		try {
			const product = await Product.findOne({
				where: {
					id: id
				}
			})
			if (!product) throw Error("The product doesn't exist")
			Product.delete(product)
			res.json({ status: 200, data: "Product has been deleted" })
			req.io.emit("deletedProduct", {
				data: product
			})
			return
		} catch (error) {
			res.status(400).send({ status: 400, data: error })
			return
		}
	}
)

export default router
