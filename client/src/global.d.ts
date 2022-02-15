import "styled-components"

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			primary: string
			secondary: string
			lightPrimary: string
			lightSecondary: string
			hoverPrimary: string
			text: string
			error: string
			background: string
			white: string
			primaryShadow: string
			backgroundShadow: string
			success: string
		}
		fonts: {
			normal: string
			sub: string
			title: string
		}
		size: {
			s: string
			xs: string
			m: string
			l: string
			xl: string
			"2l": string
			xxl: string
		}
		shadow: {
			text: string
			box: string
		}
	}
}

declare global {
	interface Category {
		id: number
		name: string
	}
	interface Ingredient {
		id: number
		name: string
		quantity: number
		important: boolean
	}

	interface Product {
		id: number
		name: string
		description: string
		calories: string
		price: number
		ingredients: Ingredient[]
		custom: boolean
		available: boolean
		category: Category
	}

	interface User {
		email: string
		role: string
	}

	interface Cart {
		product: Product
		quantity: number
	}

	interface Terminal {
		id: number
		unique_id: string
	}

	interface State {
		id: number
		name: string
	}

	interface Order {
		id: number
		createdAt: string
		totalAmount: number
		productToOrders: Cart[]
		terminal: Terminal
		state: State
	}
}
