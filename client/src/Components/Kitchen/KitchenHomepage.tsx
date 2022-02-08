import React, { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../Context/OrdersProvider"
import { Main } from "../../globalStyles"
import socketClient from "socket.io-client"
import OrderCard from "./OrderCard"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"

const KitchenHomepage = () => {
	const { ordersLoading, orders, updateOrders, addNewOrder } = useContext(OrdersContext)
	const [selectedId, setSelectedId] = useState(0)
	const ENDPOINT = "localhost:3500"

	useEffect(() => {
		const socket = socketClient(ENDPOINT)
		socket.on("modifiedOrder", (data) => {
			updateOrders(data.data)
		})
		socket.on("newOrder", (order) => {
			addNewOrder(order.data)
		})
		return () => {
			socket.disconnect()
		}
	}, [orders])

	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.5,
				staggerChildren: 0.5
			}
		}
	}

	if (ordersLoading) return <>Loading...</>

	return (
		<Main column initial="hidden" animate="show" exit="hidden" variants={variants} gap="2rem">
			<Title>In the Kitchen</Title>
			<Container>
				<Top>
					<AnimatePresence>
						{orders.map((order) => {
							if (order.state.id !== 2) {
								return <OrderCard {...order} setSelectedId={setSelectedId} key={order.id} />
							}
						})}
					</AnimatePresence>
				</Top>
				<Bottom>
					{selectedId !== 0 &&
						orders.map((order) => {
							if (order.id === selectedId) {
								return <p key={order.id}>{order.totalAmount}</p>
							}
						})}
				</Bottom>
			</Container>
		</Main>
	)
}

const Title = styled.h1`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.xl};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`

const Container = styled.div`
	padding: 2rem;
	display: flex;
	width: 90%;
	justify-content: space-between;
	flex-direction: column;
	height: 70%;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadow.box};
	border: 1px solid ${({ theme }) => theme.colors.backgroundShadow};
	position: relative;
	gap: 1rem;
`

const Top = styled(motion.div)`
	height: 250px;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	display: flex;
	scrollbar-width: thin;
	align-items: center;
	gap: 2rem;
`

const Bottom = styled(motion.div)`
	width: 100%;
	height: calc(100% - 250px);
	border: 1px solid ${({ theme }) => theme.colors.backgroundShadow};
	padding: 0.5rem;
	border-radius: 0.25rem;
`

export default KitchenHomepage
