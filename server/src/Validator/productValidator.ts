import { body } from "express-validator"
export const productValidator = [
	body("price").isNumeric(),
	body("name").isLength({ min: 3 }),
	body("description").isString().isLength({ min: 10 }),
	body("custom").isBoolean(),
	body("calories").isLength({ min: 4 }),
	body("category_id").isNumeric()
]
