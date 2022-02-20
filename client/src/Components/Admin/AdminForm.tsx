import { motion } from "framer-motion"
import React, { useContext } from "react"
import styled from "styled-components"
import { Close } from "styled-icons/material"
import { ProductsContext } from "../../Context/ProductsProvider"
import IngredientForm from "./IngredientForm"
import ProductForm from "./ProductForm"

interface Props {
	$ingredient?: boolean
}

const variants = {
	hidden: {
		x: "100%",
		transition: {
			duration: 0.5
		}
	},
	show: {
		x: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.5
		}
	}
}

const AdminForm = ({ $ingredient }: Props) => {
	const { setShowForm, setSelectedProduct, selectedProduct } = useContext(ProductsContext)

	return (
		<Container initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Close
				onClick={() => {
					setShowForm(false)
				}}
			/>
			{!$ingredient && <Title>{selectedProduct === 0 ? "Add a new product" : "Edit product"}</Title>}
			{$ingredient && <Title>{selectedProduct === 0 ? "Add a new ingredient" : "Edit ingredient"}</Title>}
			{!$ingredient && <ProductForm />}
			{$ingredient && <IngredientForm />}
		</Container>
	)
}

const Container = styled(motion.div)`
	position: absolute;
	z-index: 20;
	inset: 0;
	background: ${({ theme }) => theme.colors.background};
	& > svg {
		color: ${({ theme }) => theme.colors.text};
		position: absolute;
		top: 10px;
		right: 10px;
		height: 30px;
		width: 30px;
		cursor: pointer;
		&:hover {
			opacity: 0.75;
		}
	}
`

const Title = styled(motion.p)`
	margin-left: 1rem;
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

export default AdminForm
