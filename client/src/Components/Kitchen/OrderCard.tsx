import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { updateOrder } from "../../Services/APIs"
import Timer from "./Timer"

interface Props {
	setSelectedId: React.Dispatch<React.SetStateAction<number>>
	id: number
	createdAt: string
	totalAmount: number
	state: State
	productToOrders: Cart[]
	terminal: Terminal
}

const OrderCard = ({ id, createdAt, totalAmount, state, productToOrders, terminal, setSelectedId }: Props) => {
	const orderDone = async (order: Order) => {
		const token = localStorage.getItem("token")
		const orderUpdated: Order = { ...order, state: { ...order.state, id: 2 } }
		const result = await updateOrder(token!, orderUpdated)
	}

	const variants = {
		hidden: {
			y: -250,
			opacity: 0,
			transition: {
				duration: 0.3,
				type: "ease-in"
			}
		},
		show: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.3,
				type: "ease-in"
			}
		}
	}

	return (
		<Container variants={variants} exit="hidden" animate="show" initial="hidden">
			<CardTop>#{id}</CardTop>
			<CardBody>
				<Text>Total Amount : {totalAmount} $</Text>
				<Timer date={createdAt} />
				<Buttons>
					<Button whileHover={{ opacity: 0.8 }} onClick={() => setSelectedId(id)}>
						Details
					</Button>
					<Button whileHover={{ opacity: 0.8 }} onClick={() => orderDone({ id, createdAt, totalAmount, state, productToOrders, terminal })}>
						Confirm order
					</Button>
				</Buttons>
			</CardBody>
		</Container>
	)
}

const Container = styled(motion.div)`
	border-radius: 0.25rem;
	background-color: ${({ theme }) => theme.colors.background};
	box-shadow: ${({ theme }) => theme.shadow.text};
	cursor: pointer;
	min-width: 250px;
	gap: 0.5rem;
`

const Buttons = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;
`

const Button = styled(motion.button)`
	padding: 0.25rem;
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;
	border: none;
	font-family: ${({ theme }) => theme.fonts.normal};
	font-size: ${({ theme }) => theme.size.m};
`

const CardTop = styled(motion.div)`
	text-align: center;
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme }) => theme.colors.text};
	width: 100%;
	border-radius: 0.25rem 0.25rem 0 0;
`

const CardBody = styled(motion.div)`
	padding: 1rem;
`

const Text = styled(motion.p)`
	font-family: ${({ theme }) => theme.fonts.normal};
	font-size: ${({ theme }) => theme.size.s};
`

export default OrderCard
