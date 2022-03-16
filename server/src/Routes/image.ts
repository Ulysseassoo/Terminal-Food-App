import express from "express"
import { isAdmin } from "../Helpers/verify"
import { Image } from "../Models/Image"
import { Product } from "../Models/Product"
import { upload } from "../Middleware/upload"
import jwtExpress from "express-jwt"
import { secret } from "../keys"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/images", async (req: express.Request, res: express.Response) => {
	const images = await Image.find()
	res.json({ status: 200, data: images })
	return
})

router.post("/images", upload.single("file"), async (req: express.Request, res: express.Response) => {
	const { productId } = req.body

	if (!req.file) {
		throw new Error("Please upload a file !")
	}

	try {
		const image = new Image()
		const product = await Product.findOne(productId)
		if (!product) throw new Error("That product doesn't exist.")
		image.name = req.file.filename
		image.product = product
		const result = await Image.save(image)
		res.json({ status: 201, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.get("/images/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const image = await Image.findOne(id)
		if (!image) throw Error
		res.json({ status: 200, data: image })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The image doesn't exist" })
		return
	}
})

router.put(
	"/images/:id",
	jwtExpress({ secret: secret, algorithms: ["HS256"] }),
	isAdmin,
	upload.single("file"),
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params

		if (!req.file) {
			throw new Error("Please upload a file !")
		}

		try {
			const image = await Image.findOne(id)
			image.name = req.file.filename
			const result = await Image.save(image)
			res.json({ status: 200, data: result })
			return
		} catch (error) {
			res.json({ status: 400, data: error })
			return
		}
	}
)

router.delete("/images/:id", jwtExpress({ secret: secret, algorithms: ["HS256"] }), isAdmin, async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const image = await Image.findOne(id)
		if (!image) throw Error
		res.json({ status: 200, data: "Image has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The image doesn't exist" })
		return
	}
})

export default router
