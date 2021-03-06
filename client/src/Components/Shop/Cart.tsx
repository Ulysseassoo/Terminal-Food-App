import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction, useContext } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import styled from "styled-components"
import { Close } from "styled-icons/material"
import { CartContext } from "../../Context/CartProvider"
import { TerminalContext } from "../../Context/TerminalProvider"
import { UserContext } from "../../Context/UserProvider"
import { sendOrder } from "../../Services/APIs"
import { socket } from "../../Services/socket"
import ProductCard from "./ProductCard"

interface Props {
	setShowCart: Dispatch<SetStateAction<boolean>>
}

const variants = {
	hidden: {
		x: "100%",
		transition: {
			type: "tween"
		}
	},
	show: {
		x: 0,
		transition: {
			type: "tween"
		}
	}
}

const Cart = ({ setShowCart }: Props) => {
	const { cart, getTotalPrice, checkout } = useContext(CartContext)
	const { terminal, disconnectTerminal } = useContext(TerminalContext)
	const { sessionEnd } = useContext(UserContext)
	const navigate = useNavigate()

	const cartCheckout = async () => {
		const token = localStorage.getItem("token")
		try {
			if (cart.length <= 0) throw Error("You can't order with no product selected.")
			const { status, data } = await sendOrder({ terminal: terminal.unique_id, productToOrders: cart }, token ?? "")
			if (status === 201) {
				checkout()
				disconnectTerminal()
				sessionEnd()
				localStorage.removeItem("token")
				navigate("/checkout")
			} else {
				toast.error(data.data)
			}
		} catch (error: any) {
			toast.error(error || error.message)
		}
	}
	return (
		<Container initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Row>
				<Title>My Order</Title>
				<Close onClick={() => setShowCart(false)} />
			</Row>
			<CartProducts>
				{cart.map(({ product, quantity }) => (
					<ProductCard {...product} quantity={quantity} $cart key={product.id!} i={product.id!} />
				))}
			</CartProducts>
			<Column>
				<Row>
					<Text>Total</Text> <Price>{getTotalPrice()} $</Price>
				</Row>
				<Button onClick={() => cartCheckout()}>Checkout</Button>
			</Column>
		</Container>
	)
}

const Container = styled(motion.div)`
	height: 100%;
	width: 500px;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 30;
	position: absolute;
	right: 0;
	padding: 2rem 2rem 1rem 2rem;
	gap: 1.5rem;
`

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	& svg {
		width: 30px;
		height: 30px;
		color: ${({ theme }) => theme.colors.backgroundShadow};
		cursor: pointer;
	}
`

const Title = styled.p`
	font-size: ${({ theme }) => theme.size.m};
	font-family: ${({ theme }) => theme.fonts.title};
	color: ${({ theme }) => theme.colors.text};
	text-transform: uppercase;
`

const CartProducts = styled.div`
	height: 80%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-y: scroll;
	scrollbar-width: thin;
	padding: 0.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundShadow};
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Text = styled.p`
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.normal};
	font-weight: 600;
`

const Price = styled.p`
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.secondary};
	font-family: ${({ theme }) => theme.fonts.normal};
	font-weight: bold;
`

const Button = styled.div`
	padding: 0.5rem 0;
	width: 100%;
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.normal};
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	border-radius: 0.5rem;
	cursor: pointer;
`

export default Cart
