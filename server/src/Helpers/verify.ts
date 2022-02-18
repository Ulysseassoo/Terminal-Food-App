import express from "express"

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.user?.role === "admin") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}
export const isKitchen = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.user?.role === "kitchen") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}

export const isNotUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log(req.user)
	if (req.user?.role === "kitchen" || req.user?.role === "admin") {
		next()
	} else {
		return res.status(403).send({
			data: "Unauthorized"
		})
	}
}
