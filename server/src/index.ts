import express, { NextFunction } from "express"
import "reflect-metadata"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import http from "http"
import process from "process"
import { createConnection } from "typeorm"
import jwtExpress from "express-jwt"
import UserRoute from "./Routes/user"
import TerminalRoute from "./Routes/terminal"
import CategoryRoute from "./Routes/category"
import OrderRoute from "./Routes/order"
import ProductRoute from "./Routes/product"
import IngredientRoute from "./Routes/ingredient"
import ImageRoute from "./Routes/image"

// Declaire Global User Variable
declare global {
	namespace Express {
		interface Request {
			io: Server
		}
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
import { User } from "./Models/User"
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})
const secret = process.env.JWT_SECRET

app.use(express.json())
// Use Cors
app.use(cors())

// Secure each route with a token
app.use(
	jwtExpress({ secret: secret, algorithms: ["HS256"], credentialsRequired: false }).unless({
		path: [
			"/api/auth",
			"/api/kitchen",
			"/api/admin",
			{
				url: "/",
				method: ["GET"]
			},
			"/api/products",
			"/api/ingredients",
			"/api/images"
		]
	})
)

app.use(async (req: express.Request, res: express.Response, next: NextFunction) => {
	req.io = io
	if (req.user) {
		req.user = await User.findOne({ where: { id: req.user.id } })
		return next()
	}
	return next()
})

app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
	if (req.path.includes("/api/images/") && req.method === "GET") {
		next()
		return
	}
	if (req.path.includes("/uploads/")) {
		next()
		return
	}
	console.log(err)
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({ status: 401, data: err.inner.message })
	}
})

// To use Routes
app.use("/api/", UserRoute)
app.use("/api/", TerminalRoute)
app.use("/api/", CategoryRoute)
app.use("/api/", OrderRoute)
app.use("/api/", ProductRoute)
app.use("/api/", IngredientRoute)
app.use("/api/", ImageRoute)

// Serve Static files
app.use("/uploads", express.static("public/uploads"))

createConnection()
	.then((connection) => {
		// here you can start to work with your entities
	})
	.catch((error) => console.log(error))

io.on("connection", (socket) => {
	console.log(`a user connected: ${socket.id}`)
})

server.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`)
})
