import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { Close } from "styled-icons/material"

interface Props {
	id: number
	totalAmount: number
	state: State
	terminal: Terminal
	productToOrders: Cart[]
	setSelectedId: React.Dispatch<React.SetStateAction<number>>
}

const bottomVariants = {
	hidden: {
		opacity: 0,
		x: "100%",
		transition: {
			duration: 0.4
		}
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4
		}
	}
}

const Details = ({ id, totalAmount, state, terminal, productToOrders, setSelectedId }: Props) => {
	return (
		<Bottom initial="hidden" animate="show" exit="hidden" variants={bottomVariants}>
			<Close onClick={() => setSelectedId(0)} />
			<Flex>
				<p>Order #{id}</p>
				<p>Total Amount : {totalAmount} $</p>
				<p>Status : {state.name}</p>
				<p>From terminal : {terminal.unique_id}</p>
			</Flex>
			<Flex>
				<SubTitle>Products :</SubTitle>
				<List>
					{productToOrders.map((item) => {
						return (
							<div key={item.product.id}>
								<p>
									{item.product.name} x {item.quantity}
								</p>
								{item.product.ingredients.map((ingredient) => {
									return <Point key={ingredient.id}>- {ingredient.name}</Point>
								})}
							</div>
						)
					})}
				</List>
			</Flex>
		</Bottom>
	)
}

const Bottom = styled(motion.div)`
	width: 100%;
	height: calc(100% - 300px);
	border: 1px solid ${({ theme }) => theme.colors.backgroundShadow};
	padding: 0.5rem;
	border-radius: 0.25rem;
	position: relative;
	display: flex;
	gap: 5rem;
	font-family: ${({ theme }) => theme.fonts.normal};
	& svg {
		width: 30px;
		height: 30px;
		cursor: pointer;
		position: absolute;
		right: 10px;
		top: 10px;
		transition: 0.3s ease;
		&:hover {
			opacity: 0.6;
		}
	}
`

const Flex = styled(motion.div)`
	display: flex;
	gap: 0.5rem;
	flex-direction: column;
`

const List = styled(motion.div)`
	display: flex;
	width: fit-content;
	padding: 0 0.5rem;
	margin: 0 0.5rem;
	flex-direction: column;
	overflow-y: scroll;
	height: 100%;
	scrollbar-width: thin;
	font-family: ${({ theme }) => theme.fonts.normal};
	gap: 0.5rem;
`
const SubTitle = styled(motion.p)`
	font-size: ${({ theme }) => theme.size.m};
	font-weight: bold;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
	width: fit-content;
`
const Point = styled(motion.p)`
	margin-left: 0.5rem;
`
export default Details
