import { AnimatePresence, motion } from "framer-motion"
import React, { useContext, useState } from "react"
import styled, { useTheme } from "styled-components"
import { PlusCircleDotted } from "styled-icons/bootstrap"
import { ProductsContext } from "../../Context/ProductsProvider"
import { Main } from "../../globalStyles"
import { BarChartFill } from "@styled-icons/bootstrap"
import { Chart } from "@styled-icons/boxicons-solid"
import AdminCard from "./AdminCard"
import Table from "./Table"
import { OrdersContext } from "../../Context/OrdersProvider"
import AdminForm from "./AdminForm"

interface ProductOccurences {
	productName: string
	occurences: number
}

interface ProductIncome {
	productName: string
	revenue: number
}

const Products = () => {
	const { products, productsLoading, showForm, setShowForm } = useContext(ProductsContext)
	const { orders } = useContext(OrdersContext)
	const theme = useTheme()
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

	const getHighestRevenueProduct = (): ProductIncome => {
		const initialState = { productName: "", revenue: 0 }
		if (productsLoading) return initialState
		const result = products.map((product) => {
			let income = 0
			orders.map((order) => {
				order.productToOrders.map((cart) => {
					if (product.id === cart.product.id) {
						income += product.price * cart.quantity
					}
				})
			})
			return { productName: product.name, revenue: income }
		})
		const reducer = (previousValue: ProductIncome, currentValue: ProductIncome) => {
			if (previousValue.revenue > currentValue.revenue) return previousValue
			return currentValue
		}
		return result.reduce(reducer)
	}

	const mostSoldProduct = (): ProductOccurences => {
		const initialState = { productName: "", occurences: 0 }
		if (productsLoading) return initialState
		const result = products.map((product) => {
			let counter = 0
			orders.map((order) => {
				order.productToOrders.map((cart) => {
					if (product.id === cart.product.id) {
						counter++
					}
				})
			})
			return { productName: product.name, occurences: counter }
		})
		const reducer = (previousValue: ProductOccurences, currentValue: ProductOccurences) => {
			if (previousValue.occurences > currentValue.occurences) return previousValue
			return currentValue
		}
		return result.reduce(reducer)
	}

	return (
		<Container column gap="2rem" initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Top>
				<Title>Products</Title>{" "}
				<Button whileHover={{ backgroundColor: theme.colors.primary }} onClick={() => setShowForm(true)}>
					{" "}
					<PlusCircleDotted /> Add Product
				</Button>
			</Top>
			<Bottom>
				<Row>
					<AdminCard title="Most Sold Product" data={mostSoldProduct().occurences} Icon={BarChartFill} productName={mostSoldProduct().productName} />
					<AdminCard
						title="Highest Revenue Product"
						data={getHighestRevenueProduct().revenue}
						$price
						Icon={Chart}
						productName={getHighestRevenueProduct().productName}
					/>
				</Row>
				<Table contextData={products} $product />
			</Bottom>
			<AnimatePresence>{showForm && <AdminForm />}</AnimatePresence>
		</Container>
	)
}

const Container = styled(Main)`
	width: calc(100% - 300px);
	gap: 1rem;
	align-items: initial;
	justify-content: initial;
	padding-left: 1rem;
	position: relative;
`

const Button = styled(motion.button)`
	display: inline-flex;
	align-items: center;
	gap: 1.5rem;
	border: 3px dashed ${({ theme }) => theme.colors.primary};
	background: ${({ theme }) => theme.colors.lightPrimary};
	padding: 0.75rem;
	border-radius: 0.5rem;
	font-family: ${({ theme }) => theme.fonts.sub};
	color: ${({ theme }) => theme.colors.text};
	cursor: pointer;
	margin-top: 1rem;
	& svg {
		width: 25px;
		height: 25px;
	}
`

const Top = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem 0 0;
`

const Title = styled(motion.h1)`
	margin-top: 0.5rem;
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

const Row = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 1.75rem;
`

const Bottom = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	height: 100%;
	padding: 0 1rem 0 0;
	overflow-y: scroll;
`

export default Products
