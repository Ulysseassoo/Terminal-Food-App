import { createContext, useEffect, useState } from "react"

interface Cart {
	product: Product
	quantity: number
}

type CartContextType = {
	cart: Cart[]
	setCart: React.Dispatch<React.SetStateAction<Cart[]>>
	addProductToCart: (product: Product) => void
	deleteProductFromCart: (id: number) => void
	reduceItemQuantity: (id: number) => void
	getTotalPrice: () => number
}

const initialState = {
	cart: [],
	setCart: () => [],
	addProductToCart: () => {},
	deleteProductFromCart: () => {},
	reduceItemQuantity: () => {},
	getTotalPrice: () => 0
}

export const CartContext = createContext<CartContextType>(initialState)

export const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<Cart[]>([])

	const addProductToCart = (payload: Product) => {
		const findCartItem = !!cart.find((item) => item.product.id === payload.id)
		if (findCartItem) {
			const updatedCart = cart.map((item) => {
				if (item.product.id === payload.id) {
					item.quantity += 1
				}
				return item
			})
			return setCart([...updatedCart])
		}
		const cartItem: Cart = { product: payload, quantity: 1 }
		const newCart = [...cart, cartItem]
		return setCart(newCart)
	}

	const deleteProductFromCart = (id: number) => {
		const newCart = cart.filter((item) => item.product.id !== id)
		return setCart(newCart)
	}

	const reduceItemQuantity = (id: number) => {
		const updatedCart = cart.map((item) => {
			if (item.product.id === id && item.quantity > 1) {
				item.quantity -= 1
			}
			return item
		})
		return setCart([...updatedCart])
	}

	const getTotalPrice = () => {
		if (cart.length > 0) {
			const cartPrices = cart.map((item) => item.product.price * item.quantity)
			const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue
			return cartPrices.reduce(reducer)
		}
		return 0
	}

	return (
		<CartContext.Provider value={{ cart, setCart, addProductToCart, deleteProductFromCart, getTotalPrice, reduceItemQuantity }}>
			{children}
		</CartContext.Provider>
	)
}
