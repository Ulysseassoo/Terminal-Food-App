import express from "express"

const app = express()
const port = 3500

app.use(express.json())

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`)
})
