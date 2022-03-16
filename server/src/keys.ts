import dotenv from "dotenv"
import path from "path"
import process from "process"

// In order to use our Private keys we set up config.env file
dotenv.config({
	path: path.resolve(__dirname, "config.env")
})

export const secret = process.env.JWT_SECRET
