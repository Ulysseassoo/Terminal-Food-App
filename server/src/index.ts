import express from "express"
import "reflect-metadata"

const app = express()
const port = 3500

app.use(express.json())

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`)
})
