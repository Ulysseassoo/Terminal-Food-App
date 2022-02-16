import { createContext, useContext, useEffect, useState } from "react"
import { getIngredients } from "../Services/APIs"
import { UserContext } from "./UserProvider"

type IngredientsContextType = {
	ingredientsLoading: boolean
	ingredients: Ingredient[]
	getAllIngredients: (token: string) => void
	updateIngredient: (ingredient: Ingredient) => void
	setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
	addNewIngredient: (ingredient: Ingredient) => void
	deleteIngredient: (id: number) => void
}

const initialState = {
	ingredientsLoading: true,
	ingredients: [],
	getAllIngredients: (token: string) => [],
	setIngredients: () => {},
	updateIngredient: (ingredient: Ingredient) => {},
	addNewIngredient: (ingredient: Ingredient) => {},
	deleteIngredient: (id: number) => {}
}

export const IngredientsContext = createContext<IngredientsContextType>(initialState)

export const IngredientsProvider: React.FC = ({ children }) => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [ingredientsLoading, setIngredientsLoading] = useState(true)
	const { user } = useContext(UserContext)

	const getAllIngredients = async (token: string) => {
		try {
			let { data } = await getIngredients(token)
			setIngredients(data)
			setIngredientsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const updateIngredient = (ingredient: Ingredient) => {
		const newIngredients = [
			...ingredients.map((item) => {
				if (item.id === ingredient.id) {
					return { ...item, ...ingredient }
				}
				return item
			})
		]
		setIngredients(newIngredients)
	}

	const addNewIngredient = (ingredient: Ingredient) => {
		const newIngredients = [ingredient, ...ingredients]
		setIngredients(newIngredients)
	}

	const deleteIngredient = (id: number) => {
		const filteredIngredients = ingredients.filter((ingredient) => ingredient.id !== id)
		setIngredients(filteredIngredients)
	}

	useEffect(() => {
		if (user.role === "admin") {
			const token = localStorage.getItem("token")
			getAllIngredients(token!)
			return
		}
	}, [user])

	return (
		<IngredientsContext.Provider
			value={{ ingredients, getAllIngredients, setIngredients, deleteIngredient, ingredientsLoading, updateIngredient, addNewIngredient }}>
			{children}
		</IngredientsContext.Provider>
	)
}
