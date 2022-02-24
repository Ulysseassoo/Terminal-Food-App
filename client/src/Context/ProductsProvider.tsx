import { createContext, useEffect, useState } from "react"
import { getProducts } from "../Services/APIs"

interface ImageFetchedProduct {
	id: number
	name: string
	product: Product
}

type ProductsContextType = {
	productsLoading: boolean
	products: Product[]
	getAllProducts: () => void
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
	category: string
	setCategory: React.Dispatch<React.SetStateAction<string>>
	showForm: boolean
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>
	selectedProduct: number
	setSelectedProduct: React.Dispatch<React.SetStateAction<number>>
	deleteProductFromContext: (id: number) => void
	addNewProduct: (payload: ImageFetchedProduct) => void
	updateProductFromContext: (payload: ImageFetchedProduct) => void
}

const initialState = {
	products: [],
	productsLoading: true,
	getAllProducts: () => {},
	setProducts: () => {},
	category: "",
	showForm: false,
	setShowForm: () => {},
	selectedProduct: 0,
	setSelectedProduct: () => {},
	setCategory: () => {},
	deleteProductFromContext: (id: number) => {},
	addNewProduct: (payload: ImageFetchedProduct) => {},
	updateProductFromContext: (payload: ImageFetchedProduct) => {}
}

export const ProductsContext = createContext<ProductsContextType>(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [showForm, setShowForm] = useState(false)
	const [category, setCategory] = useState("")
	const [selectedProduct, setSelectedProduct] = useState(0)
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

	const addNewProduct = (payload: ImageFetchedProduct) => {
		const formattedPayload: Product = { ...payload.product, image: { name: payload.name, id: payload.id } }
		const newProducts = [...products, formattedPayload]
		setProducts(newProducts)
	}

	const deleteProductFromContext = (id: number) => {
		const newProducts = products.filter((product) => product.id !== id)
		setProducts(newProducts)
	}

	const updateProductFromContext = (payload: ImageFetchedProduct) => {
		const formattedPayload: Product = { ...payload.product, image: { name: payload.name, id: payload.id } }
		const newProducts = [
			...products.map((item) => {
				if (item.id === payload.id) {
					return { ...item, ...formattedPayload }
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
		<ProductsContext.Provider
			value={{
				products,
				addNewProduct,
				showForm,
				setShowForm,
				getAllProducts,
				setProducts,
				deleteProductFromContext,
				productsLoading,
				category,
				setCategory,
				selectedProduct,
				setSelectedProduct,
				updateProductFromContext
			}}>
			{children}
		</ProductsContext.Provider>
	)
}
