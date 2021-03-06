import { motion } from "framer-motion"
import React, { useContext } from "react"
import styled, { useTheme } from "styled-components"
import { OrdersContext } from "../../Context/OrdersProvider"
import { Main } from "../../globalStyles"
import AdminCard from "./AdminCard"
import { BarChartFill } from "@styled-icons/bootstrap"
import { Chart } from "@styled-icons/boxicons-solid"
import Table from "./Table"
import Stock from "./Stock"
import { Link } from "react-router-dom"
import { IngredientsContext } from "../../Context/IngredientsProvider"

interface ColumnProps {
	width: string
	padding?: string
}

const Content = () => {
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
	const { orders, ordersLoading } = useContext(OrdersContext)
	const { ingredientsLoading } = useContext(IngredientsContext)

	const completedOrders = () => {
		if (orders.length === 0 || orders === undefined || orders === null) return 0
		const numberOrders = orders.filter((order) => order.state.id === 2)
		return numberOrders.length
	}

	const ordersSales = () => {
		if (orders.length > 0 && orders !== undefined && orders !== null) {
			const totalAmount = orders.map((item) => item.totalAmount)
			const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue
			return totalAmount.reduce(reducer)
		}
		return 0
	}

	if (ordersLoading || ingredientsLoading) return <></>

	return (
		<Container column gap="2rem" initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Title>Dashboard</Title>
			<Wrapper>
				<Column width="70%">
					<Row>
						<AdminCard title="Completed Orders" data={completedOrders()} Icon={BarChartFill} />
						<AdminCard title="Total Sales" data={ordersSales()} $price Icon={Chart} />
					</Row>
					<Full>
						<Subtitle>Recent Orders</Subtitle>
						<Table contextData={orders} $order />
						<CustomLink to="/admin/orders">See all the products</CustomLink>
					</Full>
				</Column>
				<Column width="30%" padding="0.5rem 1rem 1.5rem 1rem">
					<Box>
						<Subtitle>Stock</Subtitle>
						<Stock />
					</Box>
				</Column>
			</Wrapper>
		</Container>
	)
}

const Container = styled(Main)`
	width: calc(100% - 300px);
	gap: 1rem;
	align-items: initial;
	justify-content: initial;
	padding-left: 1rem;
`

const Wrapper = styled(motion.div)`
	flex-direction: row;
	gap: 2rem;
	width: 100%;
	display: flex;
	height: 100%;
`

const Title = styled(motion.h1)`
	margin-top: 0.5rem;
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

const Subtitle = styled(motion.p)`
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	text-transform: capitalize;
`

const Column = styled(motion.div)<ColumnProps>`
	display: flex;
	flex-direction: column;
	width: ${({ width }) => width};
	height: 100%;
	gap: 1.5rem;
	padding: ${({ padding }) => (padding ? padding : "")};
`

const Row = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 1.75rem;
`
const Full = styled(motion.div)`
	width: 100%;
	height: 100%;
	padding-bottom: 1rem;
	flex-direction: column;
	display: flex;
`

const Box = styled(motion.div)`
	width: 100%;
	height: calc(100% - 55px);
`

const CustomLink = styled(Link)`
	align-self: center;
	text-align: center;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.secondary};
	font-size: ${({ theme }) => theme.size.s};
	transition: 0.3s ease-in;
	&:hover {
		opacity: 0.8;
	}
`

export default Content
