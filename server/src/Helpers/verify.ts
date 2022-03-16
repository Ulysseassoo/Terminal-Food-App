import express from "express"
import { User } from "../Models/User"

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	req.user = await User.findOne({ where: { id: req.user.id } })
	if (req.user?.role === "admin") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}
export const isKitchen = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	req.user = await User.findOne({ where: { id: req.user.id } })
	if (req.user?.role === "kitchen") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}

export const isNotUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	req.user = await User.findOne({ where: { id: req.user.id } })
	if (req.user?.role === "kitchen" || req.user?.role === "admin") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}
