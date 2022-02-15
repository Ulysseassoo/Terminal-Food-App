import React from "react"
import styled from "styled-components"
import { Main } from "../../globalStyles"

const Products = () => {
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
			Products
		</Container>
	)
}

const Container = styled(Main)`
	width: calc(100% - 300px);
`

export default Products
