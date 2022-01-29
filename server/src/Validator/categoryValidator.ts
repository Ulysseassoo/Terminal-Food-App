import { body } from "express-validator"
export const categoryValidator = [body("name").isLength({ min: 1 })]
