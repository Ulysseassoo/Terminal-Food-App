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
		category: Category
	}
}
