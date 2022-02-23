import multer from "multer"
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads")
	},
	filename: (req, file, cb) => {
		let filetype = ""
		if (file.mimetype === "image/gif") {
			filetype = "gif"
		}
		if (file.mimetype === "image/png") {
			filetype = "png"
		}
		if (file.mimetype === "image/jpeg") {
			filetype = "jpg"
		}
		cb(null, "image-" + Date.now() + "." + filetype)
	}
})
export const upload = multer({ storage: storage })
