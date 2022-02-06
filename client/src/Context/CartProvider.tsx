import { createContext, useEffect, useState } from "react"

type CartContextType = {
	cart: Product[]
	setCart: React.Dispatch<React.SetStateAction<Product[]>>
	addProductToCart: (product: Product) => void
	deleteProductFromCart: (id: number) => void
	getTotalPrice: () => number
}

const initialState = {
	cart: [],
	setCart: () => [],
	addProductToCart: () => {},
	deleteProductFromCart: () => {},
	getTotalPrice: () => 0
}

export const CartContext = createContext<CartContextType>(initialState)

export const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<Product[]>([])

	const addProductToCart = (product: Product) => {
		const newCart = [...cart, product]
		return setCart(newCart)
	}

	const deleteProductFromCart = (id: number) => {
		const newCart = cart.filter((product) => product.id !== id)
		return setCart(newCart)
	}

	const getTotalPrice = () => {
		if (cart.length > 0) {
			const cartPrices = cart.map((product) => product.price)
			const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue
			return cartPrices.reduce(reducer)
		}
		return 0
	}

	return <CartContext.Provider value={{ cart, setCart, addProductToCart, deleteProductFromCart, getTotalPrice }}>{children}</CartContext.Provider>
}
