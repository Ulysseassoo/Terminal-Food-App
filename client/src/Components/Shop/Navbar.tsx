import React from "react"
import styled from "styled-components"
import { Pizza } from "@styled-icons/ionicons-solid/Pizza"
import { ShoppingCart } from "@styled-icons/feather/ShoppingCart"
import { Search } from "@styled-icons/feather/Search"

const Navbar = () => {
	return (
		<Container>
			<Logo>
				Pizz
				<Pizza /> restaurant
			</Logo>
			<Icons>
				<Search />
				<ShoppingCart />
			</Icons>
		</Container>
	)
}

const Container = styled.header`
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 2rem;
`

const Logo = styled.div`
	font-size: ${({ theme }) => theme.size.l};
	font-family: ${({ theme }) => theme.fonts.title};
	color: ${({ theme }) => theme.colors.primary};
	display: inline-flex;
	align-items: center;
	gap: 0.2rem;
	font-weight: bold;
	text-transform: uppercase;
	font-style: italic;
	user-select: none;
	& > svg {
		height: 40px;
		width: 40px;
		color: ${({ theme }) => theme.colors.primary};
		margin-right: 0.6rem;
	}
`

const Icons = styled.div`
	display: inline-flex;
	gap: 2rem;
	align-items: center;
	& svg {
		height: 35px;
		width: 35px;
		color: ${({ theme }) => theme.colors.text};
		cursor: pointer;
	}
`

export default Navbar
