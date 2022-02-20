import React, { useContext } from "react"
import styled, { useTheme } from "styled-components"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { Main } from "../../globalStyles"
import { PlusCircleDotted } from "styled-icons/bootstrap"
import { AnimatePresence, motion } from "framer-motion"
import Table from "./Table"
import { ProductsContext } from "../../Context/ProductsProvider"
import AdminForm from "./AdminForm"

const Ingredients = () => {
	const { ingredients } = useContext(IngredientsContext)
	const { showForm, setShowForm } = useContext(ProductsContext)
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

	return (
		<Container column gap="2rem" initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Top>
				<Title>Ingredients</Title>{" "}
				<Button whileHover={{ backgroundColor: theme.colors.primary }} onClick={() => setShowForm(true)}>
					{" "}
					<PlusCircleDotted /> Add Ingredient
				</Button>
			</Top>
			<Bottom>
				<Table contextData={ingredients} $ingredient />
			</Bottom>
			<AnimatePresence>{showForm && <AdminForm $ingredient />}</AnimatePresence>
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
`

export default Ingredients
