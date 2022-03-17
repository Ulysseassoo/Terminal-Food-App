import React, { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../Context/OrdersProvider"
import { Main } from "../../globalStyles"
import socketClient from "socket.io-client"
import OrderCard from "./OrderCard"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import Details from "./Details"
import { socket } from "../../Services/socket"
import { LogOut } from "styled-icons/boxicons-solid"
import { UserContext } from "../../Context/UserProvider"
import { useNavigate } from "react-router"

const KitchenHomepage = () => {
	const { ordersLoading, orders, updateOrders, addNewOrder } = useContext(OrdersContext)
	const [selectedId, setSelectedId] = useState(0)
	const { sessionEnd } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		socket.on("modifiedOrder", (data) => {
			updateOrders(data.data)
		})
		socket.on("newOrder", (order) => {
			addNewOrder(order.data)
		})
		return () => {
			socket.off("modifiedOrder")
			socket.off("newOrder")
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

	const loggingOut = () => {
		sessionEnd()
		socket.emit("user_disconnect")
		navigate("/accounts")
	}

	if (ordersLoading) return <>Loading...</>

	return (
		<Main column initial="hidden" animate="show" exit="hidden" variants={variants} gap="2rem">
			<Logout whileHover={{ opacity: 0.8 }} onClick={() => loggingOut()}>
				{" "}
				<LogOut /> Logout
			</Logout>
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
				<AnimatePresence exitBeforeEnter>
					{selectedId !== 0 &&
						orders.map((order) => {
							if (order.id === selectedId) {
								return <Details {...order} setSelectedId={setSelectedId} key={order.id} />
							}
						})}
				</AnimatePresence>
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

const Logout = styled(motion.div)`
	display: inline-flex;
	align-items: center;
	color: ${({ theme }) => theme.colors.error};
	gap: 3rem;
	width: 100%;
	padding: 2.5rem;
	margin-top: auto;
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	& svg {
		width: 28px;
		height: 28px;
	}
`

export default KitchenHomepage
