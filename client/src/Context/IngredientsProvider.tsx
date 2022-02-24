import { createContext, useContext, useEffect, useState } from "react"
import { getIngredients } from "../Services/APIs"
import { UserContext } from "./UserProvider"

type IngredientsContextType = {
	ingredientsLoading: boolean
	ingredients: Ingredient[]
	getAllIngredients: (token: string) => void
	updateIngredientFromContext: (ingredient: Ingredient) => void
	setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
	addNewIngredient: (ingredient: Ingredient) => void
	deleteIngredientFromContext: (id: number) => void
	refreshQuantity: (stock: Stock) => void
}

const initialState = {
	ingredientsLoading: true,
	ingredients: [],
	getAllIngredients: (token: string) => [],
	setIngredients: () => {},
	updateIngredientFromContext: (ingredient: Ingredient) => {},
	addNewIngredient: (ingredient: Ingredient) => {},
	deleteIngredientFromContext: (id: number) => {},
	refreshQuantity: (stock: Stock) => {}
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

	const updateIngredientFromContext = (ingredient: Ingredient) => {
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

	const deleteIngredientFromContext = (id: number) => {
		const filteredIngredients = ingredients.filter((ingredient) => ingredient.id !== id)
		setIngredients(filteredIngredients)
	}

	const refreshQuantity = (stock: Stock) => {
		const newIngredients = [
			...ingredients.map((item) => {
				if (item.id === stock.ingredient?.id) {
					return { ...item, stock: stock }
				}
				return item
			})
		]
		setIngredients(newIngredients)
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		getAllIngredients(token!)
	}, [user])

	return (
		<IngredientsContext.Provider
			value={{
				ingredients,
				getAllIngredients,
				refreshQuantity,
				setIngredients,
				deleteIngredientFromContext,
				ingredientsLoading,
				updateIngredientFromContext,
				addNewIngredient
			}}>
			{children}
		</IngredientsContext.Provider>
	)
}
