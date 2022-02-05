import { createContext, useEffect, useState } from "react"
import { getProducts } from "../Services/APIs"

type ProductsContextType = {
	productsLoading: boolean
	products: Product[]
	getAllProducts: () => {}
	setProducts: React.Dispatch<React.SetStateAction<never[]>>
}

export const ProductsContext = createContext<ProductsContextType | null>(null)

export const ProductsProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState([])
	const [productsLoading, setProductsLoading] = useState(true)

	const getAllProducts = async () => {
		try {
			let { data } = await getProducts()
			setProducts(data)
			setProductsLoading(false)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getAllProducts()
	}, [])

	return <ProductsContext.Provider value={{ products, getAllProducts, setProducts, productsLoading }}>{children}</ProductsContext.Provider>
}
