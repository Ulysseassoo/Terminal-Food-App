import express from "express"
import "reflect-metadata"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import { createConnection } from "typeorm"
import UserRoute from "./Routes/user"
import TerminalRoute from "./Routes/terminal"
import CategoryRoute from "./Routes/category"
import OrderRoute from "./Routes/order"
import ProductRoute from "./Routes/product"
import IngredientRoute from "./Routes/ingredient"

// In order to use our Private keys we set up config.env file
dotenv.config({
	path: path.resolve(__dirname, "config.env")
})

const app = express()
const port = 3500

app.use(express.json())
// Use Cors
app.use(cors())

createConnection()
	.then((connection) => {
		// here you can start to work with your entities
	})
	.catch((error) => console.log(error))

// To use controller
app.use("/api/", UserRoute)
app.use("/api/", TerminalRoute)
app.use("/api/", CategoryRoute)
app.use("/api/", OrderRoute)
app.use("/api/", ProductRoute)
app.use("/api/", IngredientRoute)

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`)
})
