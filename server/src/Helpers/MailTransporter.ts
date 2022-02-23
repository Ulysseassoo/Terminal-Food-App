import { createTransport } from "nodemailer"
import dotenv from "dotenv"
import path from "path"
import process from "process"
import SMTPTransport from "nodemailer/lib/smtp-transport"

dotenv.config({
	path: path.resolve(__dirname, "../config.env")
})

export const transporter = createTransport({
	port: process.env.SMTP_PORT || 0,
	secure: false,
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD
	}
} as SMTPTransport.Options)
