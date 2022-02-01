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
