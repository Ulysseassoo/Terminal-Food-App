import axios, { AxiosError } from "axios"

interface loginData {
	email: string
	password: string
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
	const reponse = await axios.post(`${url}/auth`, postData)
	return reponse
}

export const getProducts = async () => {
	const reponse = await axios.get(`${url}/products`)
	return reponse.data
}

export const getCategories = async () => {
	const reponse = await axios.get(`${url}/categories`)
	return reponse.data
}
