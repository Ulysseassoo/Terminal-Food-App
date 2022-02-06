import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import process from "process"
import { User } from "../Models/User"
import { validationResult } from "express-validator"
import { userValidator } from "../Validator/userValidator"

const router = express.Router()

// ------------------------------------------- FUNCTIONS --------------------------------------------

const generateSignedToken = (user: User) => {
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

const sendToken = (user: User, statusCode: number, res: any) => {
	const token = generateSignedToken(user)
	res.status(statusCode).json({
		status: statusCode,
		token: `Bearer ${token}`,
		data: {
			email: user.email,
			role: user.role
		}
	})
}

//  ------------------------------------------ ROUTES -----------------------------------------------

// router.get("/users", async (req: express.Request, res: express.Response) => {
// 	const user = new User()
// 	const salt = bcrypt.genSaltSync(6)
// 	let passwordEncrypted = bcrypt.hashSync("123456admin", salt)
// 	user.password = passwordEncrypted
// 	user.email = "admin@gmail.com"
// 	user.role = "admin"
// 	User.save(user)
// 	return res.status(201).send({ message: "created" })
// })

router.post("/auth", userValidator, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).json({
			status: 401,
			data: errors
		})
		return
	}

	const { email, password } = req.body

	try {
		const user = await User.findOne({
			where: {
				email: email
			}
		})
		if (!user) throw Error
		const isMatch = bcrypt.compareSync(password, user.password)
		if (isMatch === false) throw Error
		sendToken(user, 200, res)
		return
	} catch (error) {
		res.status(401).json({
			status: 401,
			data: "Invalid credentials"
		})
		return
	}
})

router.post("/kitchen", userValidator, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).json({
			status: 401,
			data: errors
		})
		return
	}

	const { email, password } = req.body

	try {
		const user = await User.findOne({
			where: {
				email: email
			}
		})
		if (!user) throw Error
		const isMatch = bcrypt.compareSync(password, user.password)
		if (isMatch === false) throw Error
		if (user.role !== "kitchen")
			return res.status(401).json({
				status: 401,
				data: "Not authorized"
			})
		sendToken(user, 200, res)
		return
	} catch (error) {
		res.status(401).json({
			status: 401,
			data: "Invalid credentials"
		})
		return
	}
})

router.post("/admin", userValidator, async (req: express.Request, res: express.Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).json({
			status: 401,
			data: errors
		})
		return
	}

	const { email, password } = req.body

	try {
		const user = await User.findOne({
			where: {
				email: email
			}
		})
		if (!user) throw Error
		const isMatch = bcrypt.compareSync(password, user.password)
		if (isMatch === false) throw Error
		if (user.role !== "admin")
			return res.status(401).json({
				status: 401,
				data: "Not authorized"
			})
		sendToken(user, 200, res)
		return
	} catch (error) {
		res.status(401).json({
			status: 401,
			data: "Invalid credentials"
		})
		return
	}
})
export default router
