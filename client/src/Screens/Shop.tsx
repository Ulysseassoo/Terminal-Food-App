import React from "react"
import styled, { useTheme } from "styled-components"
import Navbar from "../Components/Shop/Navbar"
import Selector from "../Components/Shop/Selector"
import Slider from "../Components/Shop/Slider"
import { Main } from "../globalStyles"

const Shop = () => {
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
		<Container column background={theme.colors.background} initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Navbar />
			<Flex>
				<Selector />
				<Left>
					<h2>Pizzas</h2>
					<Slider />
				</Left>
			</Flex>
		</Container>
	)
}

const Container = styled(Main)`
	justify-content: initial;
	align-items: initial;
`
const Flex = styled.main`
	display: flex;
	height: 100%;
`
const Left = styled.div`
	display: flex;
	flex-direction: column;
`

export default Shop
