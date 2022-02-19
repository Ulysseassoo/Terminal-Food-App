import { motion } from "framer-motion"
import React, { useContext } from "react"
import styled from "styled-components"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { Circles } from "react-loader-spinner"

const Stock = () => {
	const { ingredients, ingredientsLoading } = useContext(IngredientsContext)

	if (ingredientsLoading)
		return (
			<Container>
				<Circles color="blue" height={110} width={110} ariaLabel="three-circles-rotating" />
			</Container>
		)
	return (
		<Container>
			<Box>
				<Sub>Ingredient</Sub> <Sub>Quantity</Sub>
			</Box>
			{ingredients.map((ingredient) => (
				<Box key={ingredient.id}>
					<p>{ingredient.name} :</p> <p>{ingredient.stock?.quantity}</p>
				</Box>
			))}
		</Container>
	)
}

const Container = styled(motion.div)`
	box-shadow: ${({ theme }) => theme.shadow.box};
	height: 100%;
	width: 100%;
	border-radius: 0.5rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	overflow-y: scroll;
	scrollbar-width: thin;
`

const Box = styled(motion.div)`
	text-align: left;
	width: 100%;
	display: inline-flex;
	justify-content: space-between;
`

const Sub = styled(motion.p)`
	font-size: ${({ theme }) => theme.size.m};
`

export default Stock
