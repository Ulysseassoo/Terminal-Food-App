import { createContext, useEffect, useState } from "react"

type CartContextType = {
	cart: Product[]
	setCart: React.Dispatch<React.SetStateAction<Product[]>>
	addProductToCart: (product: Product) => void
	deleteProductFromCart: (id: number) => void
}

export const CartContext = createContext<CartContextType | null>(null)

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

	return <CartContext.Provider value={{ cart, setCart, addProductToCart, deleteProductFromCart }}>{children}</CartContext.Provider>
}
