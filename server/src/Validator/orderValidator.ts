import { body } from "express-validator"
export const orderValidator = [body("terminal").isString()]
