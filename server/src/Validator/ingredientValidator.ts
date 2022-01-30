import { body } from "express-validator"
export const ingredientValidator = [body("name").isLength({ min: 3 }), body("quantity").isNumeric(), body("important").isBoolean()]
