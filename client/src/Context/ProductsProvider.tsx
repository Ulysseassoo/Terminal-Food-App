import { createContext, useEffect, useState } from "react"
import { getProducts } from "../Services/APIs"

type ProductsContextType = {
	productsLoading: boolean
	products: Product[]
	getAllProducts: () => void
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
	category: string
	setCategory: React.Dispatch<React.SetStateAction<string>>
	deleteProductFromContext: (id: number) => void
}

const initialState = {
	products: [],
	productsLoading: true,
	getAllProducts: () => {},
	setProducts: () => {},
	category: "",
	setCategory: () => {},
	deleteProductFromContext: (id: number) => {}
}

export const ProductsContext = createContext<ProductsContextType>(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [category, setCategory] = useState("")
	const [productsLoading, setProductsLoading] = useState(true)

	const getAllProducts = async () => {
		try {
			let { data } = await getProducts()
			setProducts(data)
			setCategory("Pizza")
			setProductsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const addNewProduct = (payload: Product) => {
		const newProducts = [...products, payload]
		setProducts(newProducts)
	}

	const deleteProductFromContext = (id: number) => {
		const newProducts = products.filter((product) => product.id !== id)
		setProducts(newProducts)
	}

	const updateProduct = (payload: Product) => {
		const newProducts = [
			...products.map((item) => {
				if (item.id === payload.id) {
					return { ...item, ...payload }
				}
				return item
			})
		]
		setProducts(newProducts)
	}

	useEffect(() => {
		getAllProducts()
	}, [])

	return (
		<ProductsContext.Provider value={{ products, getAllProducts, setProducts, deleteProductFromContext, productsLoading, category, setCategory }}>
			{children}
		</ProductsContext.Provider>
	)
}
