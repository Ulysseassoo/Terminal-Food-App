import { createContext, useContext, useEffect, useState } from "react"
import { getCategories } from "../Services/APIs"
import { UserContext } from "./UserProvider"

type CategoriesContextType = {
	categoriesLoading: boolean
	categories: Category[]
	getAllCategories: (token: string) => void
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const initialState = {
	categoriesLoading: true,
	categories: [],
	getAllCategories: (token: string) => [],
	setCategories: () => {}
}

export const CategoriesContext = createContext<CategoriesContextType>(initialState)

export const CategoriesProvider: React.FC = ({ children }) => {
	const [categories, setCategories] = useState<Category[]>([])
	const [categoriesLoading, setCategoriesLoading] = useState(true)
	const { user } = useContext(UserContext)

	const getAllCategories = async (token: string) => {
		try {
			let { data } = await getCategories(token)
			setCategories(data)
			setCategoriesLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (user.role === "admin") {
			const token = localStorage.getItem("token")
			getAllCategories(token!)
			return
		}
	}, [user])

	return (
		<CategoriesContext.Provider
			value={{
				categories,
				getAllCategories,
				setCategories,
				categoriesLoading
			}}>
			{children}
		</CategoriesContext.Provider>
	)
}
