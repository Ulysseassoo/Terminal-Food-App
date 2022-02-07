import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Pizza } from "@styled-icons/ionicons-solid/Pizza"
import { ShoppingCart } from "@styled-icons/feather/ShoppingCart"
import { Search } from "@styled-icons/feather/Search"
import { CartContext } from "../../Context/CartProvider"
import Cart from "./Cart"
import { AnimatePresence } from "framer-motion"

const Navbar = () => {
	const { cart } = useContext(CartContext)!
	const [showCart, setShowCart] = useState(false)

	return (
		<AnimatePresence>
			{showCart && <Shadow key="shadow" />}
			{showCart && <Cart setShowCart={setShowCart} key="cartShow" />}
			<Container>
				<Logo>
					Pizz
					<Pizza /> restaurant
				</Logo>
				<Icons>
					<Search />
					<CartContainer>
						<Notifications>{cart.length}</Notifications>
						<ShoppingCart onClick={() => setShowCart(true)} />
					</CartContainer>
				</Icons>
			</Container>
		</AnimatePresence>
	)
}

const Container = styled.header`
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 2rem;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
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

const CartContainer = styled.div`
	height: 35px;
	width: 35px;
	position: relative;
`

const Notifications = styled.p`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.text};
	height: 20px;
	width: 20px;
	border-radius: 50%;
	position: absolute;
	top: -5px;
	left: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ theme }) => theme.size.s};
	font-family: ${({ theme }) => theme.fonts.normal};
	box-shadow: rgb(235, 163, 64) 3px 3px 6px 0px inset, rgb(188, 138, 72) -3px -3px 6px 1px inset;
	font-weight: 600;
`

const Shadow = styled.div`
	height: 100%;
	width: 100%;
	inset: 0;
	position: absolute;
	background-color: ${({ theme }) => theme.colors.backgroundShadow};
	z-index: 30;
`

export default Navbar
