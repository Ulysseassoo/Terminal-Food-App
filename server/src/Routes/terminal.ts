import express from "express"
import { Terminal } from "../Models/Terminal"
import { v4 as uuidv4 } from "uuid"

const router = express.Router()

//  ------------------------------------------ ROUTES -----------------------------------------------

router.get("/terminals", async (req: express.Request, res: express.Response) => {
	const terminals = await Terminal.find({ relations: ["orders"] })
	res.json({ status: 200, data: terminals })
	return
})

router.post("/terminals", async (req: express.Request, res: express.Response) => {
	try {
		const terminal = new Terminal()
		const uniqueId = uuidv4()
		terminal.unique_id = uniqueId
		const result = await Terminal.save(terminal)
		res.json({ status: 200, data: result })
		return
	} catch (error) {
		res.json({ status: 400, data: error })
		return
	}
})

router.get("/terminals/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const terminal = await Terminal.findOne({
			where: {
				id: id
			},
			relations: ["orders"]
		})
		if (!terminal) throw Error
		res.json({ status: 200, data: terminal })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The terminal doesn't exist" })
		return
	}
})

router.delete("/terminals/:id", async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	try {
		const terminal = await Terminal.findOne({
			where: {
				id: id
			}
		})
		if (!terminal) throw Error
		res.json({ status: 200, data: "Terminal has been deleted" })
		return
	} catch (error) {
		res.status(400).send({ status: 400, data: "The terminal doesn't exist" })
		return
	}
})

export default router
