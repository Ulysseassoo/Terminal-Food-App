import { motion } from "framer-motion"
import React, { useContext } from "react"
import styled, { useTheme } from "styled-components"
import { PlusCircleDotted } from "styled-icons/bootstrap"
import { ProductsContext } from "../../Context/ProductsProvider"
import { Main } from "../../globalStyles"
import { BarChartFill } from "@styled-icons/bootstrap"
import { Chart } from "@styled-icons/boxicons-solid"
import AdminCard from "./AdminCard"
import Table from "./Table"

const Products = () => {
	const { products } = useContext(ProductsContext)
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

	const completedOrders = () => {
		if (products.length === 0 || products === undefined || products === null) return 0
		const numberOrders = products.filter((order) => order.state.id === 2)
		return numberOrders.length
	}

	const ordersSales = () => {
		if (products.length > 0 && products !== undefined && products !== null) {
			const totalAmount = products.map((item) => item.totalAmount)
			const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue
			return totalAmount.reduce(reducer)
		}
		return 0
	}

	return (
		<Container column gap="2rem" initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Top>
				<Title>Products</Title>{" "}
				<Button whileHover={{ backgroundColor: theme.colors.primary }}>
					{" "}
					<PlusCircleDotted /> Add Product
				</Button>
			</Top>
			<Bottom>
				<Row>
					<AdminCard title="Most Sold Product" data={0} Icon={BarChartFill} />
					<AdminCard title="Highest Revenue Product" data={0} $price Icon={Chart} />
				</Row>
				<Table contextData={products} $product />
			</Bottom>
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
`

export default Products
