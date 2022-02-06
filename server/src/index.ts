import express, { NextFunction } from "express"
import "reflect-metadata"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import http from "http"
import { createConnection } from "typeorm"
import jwtExpress from "express-jwt"
import UserRoute from "./Routes/user"
import TerminalRoute from "./Routes/terminal"
import CategoryRoute from "./Routes/category"
import OrderRoute from "./Routes/order"
import ProductRoute from "./Routes/product"
import IngredientRoute from "./Routes/ingredient"
import process from "process"

// Declaire Global User Variable
declare global {
	namespace Express {
		interface User {
			id: number
			email: string
			password: string
			role: string
		}
	}
}

// In order to use our Private keys we set up config.env file
dotenv.config({
	path: path.resolve(__dirname, "config.env")
})

const app = express()
const port = 3500
const server = http.createServer(app)
import { Server } from "socket.io"
const io = new Server(server)
const secret = process.env.JWT_SECRET

app.use(express.json())
// Use Cors
app.use(cors())

// Secure each route with a token
app.use(
	jwtExpress({ secret: secret, algorithms: ["HS256"] }).unless({
		path: ["/api/auth", "/api/kitchen", "/api/admin", "/api/orders", "/api/products"]
	})
)

app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ status: 401, data: "invalid token..." })
	}
})

createConnection()
	.then((connection) => {
		// here you can start to work with your entities
	})
	.catch((error) => console.log(error))

// To use Routes
app.use("/api/", UserRoute)
app.use("/api/", TerminalRoute)
app.use("/api/", CategoryRoute)
app.use("/api/", OrderRoute)
app.use("/api/", ProductRoute)
app.use("/api/", IngredientRoute)

io.on("connection", (socket) => {
	console.log(`a user connected: ${socket.id}`)
})

server.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`)
})
