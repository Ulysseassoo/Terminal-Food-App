import { createContext, useEffect, useState } from "react"
import { getProducts } from "../Services/APIs"

type ProductsContextType = {
	productsLoading: boolean
	products: Product[]
	getAllProducts: () => void
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const initialState = {
	products: [],
	productsLoading: true,
	getAllProducts: () => {},
	setProducts: () => {}
}

export const ProductsContext = createContext<ProductsContextType>(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [productsLoading, setProductsLoading] = useState(true)

	const getAllProducts = async () => {
		try {
			let { data } = await getProducts()
			setProducts(data)
			setProductsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const addNewProduct = (payload: Product) => {
		const newProducts = [...products, payload]
		setProducts(newProducts)
	}

	const deleteProduct = (id: number) => {
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

	return <ProductsContext.Provider value={{ products, getAllProducts, setProducts, productsLoading }}>{children}</ProductsContext.Provider>
}
