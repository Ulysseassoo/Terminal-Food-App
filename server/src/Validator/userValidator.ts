import { body } from "express-validator"
export const userValidator = [body("email").isEmail(), body("password").isLength({ min: 4 })]
