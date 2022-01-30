import express from "express"

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.user?.role === "admin") {
		next()
	} else {
		res.status(403).send({
			data: "Unauthorized"
		})
	}
}
export const isKitchen = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.user?.role === "kitchen") {
		next()
	} else {
		res.status(403).send({
			data: "Unauthorized"
		})
	}
}
