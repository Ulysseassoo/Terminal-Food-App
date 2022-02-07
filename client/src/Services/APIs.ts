import axios, { AxiosError } from "axios"

interface loginData {
	email: string
	password: string
}

interface Cart {
	product: Product
	quantity: number
}

interface Order {
	productToOrders: Cart[]
	user?: number
	terminal: string
}

const url = "http://localhost:3500/api"

export const kitchenLogin = async (postData: loginData) => {
	const response = await axios.post(`${url}/kitchen`, postData)
	return response
}

export const adminLogin = async (postData: loginData) => {
	const response = await axios.post(`${url}/admin`, postData)
	return response
}

export const userLogin = async (postData: loginData) => {
	const response = await axios.post(`${url}/auth`, postData)
	return response
}

export const getProducts = async () => {
	const response = await axios.get(`${url}/products`)
	return response.data
}

export const getCategories = async () => {
	const response = await axios.get(`${url}/categories`)
	return response.data
}

export const sendOrder = async (order: Order) => {
	const response = await axios.post(`${url}/orders`, order, {
		headers: {
			"Content-type": "application/json"
		}
	})
	return response
}
