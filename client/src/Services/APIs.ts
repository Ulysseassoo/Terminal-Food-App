import axios, { AxiosError } from "axios"

interface loginData {
	email: string
	password: string
}

interface OrderToSend {
	productToOrders: Cart[]
	user?: number
	terminal: string
}

interface ImageData {
	productId: string
	file: File
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

export const createProduct = async (product: Product, token: string) => {
	const response = await axios.post(`${url}/products`, product, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const updateProduct = async (product: Product, token: string, productId: number) => {
	const response = await axios.put(`${url}/products/${productId}`, product, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const deleteProduct = async (id: number, token: string) => {
	const response = await axios.delete(`${url}/products/${id}`, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const getCategories = async (token: string) => {
	const response = await axios.get(`${url}/categories`, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const getOrders = async (token: string) => {
	const response = await axios.get(`${url}/orders`, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const getIngredients = async (token: string) => {
	const response = await axios.get(`${url}/ingredients`, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const createIngredient = async (ingredient: Ingredient, token: string) => {
	const response = await axios.post(`${url}/ingredients`, ingredient, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const updateIngredient = async (ingredient: Ingredient, token: string, ingredientId: number) => {
	const response = await axios.put(`${url}/ingredients/${ingredientId}`, ingredient, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const deleteIngredient = async (id: number, token: string) => {
	const response = await axios.delete(`${url}/ingredients/${id}`, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const updateOrder = async (token: string, data: Order): Promise<Order> => {
	const response = await axios.put(`${url}/orders/${data.id}`, data, {
		headers: {
			Authorization: token,
			"Content-type": "application/json"
		}
	})
	return response.data
}

export const sendOrder = async (order: OrderToSend, token: string) => {
	const response = await axios.post(`${url}/orders`, order, {
		headers: {
			"Content-type": "application/json",
			Authorization: token
		}
	})
	return response
}

export const createProductImage = async (image: FormData, token: string) => {
	const response = await axios.post(`${url}/images`, image, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}

export const updateProductImage = async (image: FormData, token: string, imageId: number) => {
	const response = await axios.put(`${url}/images/${imageId}`, image, {
		headers: {
			Authorization: token
		}
	})
	return response.data
}
