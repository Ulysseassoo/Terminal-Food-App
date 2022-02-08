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

	const addNewProduct = (product: Product) => {
		const newOrders = [...products, product]
		setProducts(newOrders)
	}

	const deleteProduct = (id: number) => {
		const newOrders = products.filter((product) => product.id !== id)
		setProducts(newOrders)
	}

	useEffect(() => {
		getAllProducts()
	}, [])

	return <ProductsContext.Provider value={{ products, getAllProducts, setProducts, productsLoading }}>{children}</ProductsContext.Provider>
}
