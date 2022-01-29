import { body } from "express-validator"
export const orderValidator = [body("totalAmount").isNumeric()]
