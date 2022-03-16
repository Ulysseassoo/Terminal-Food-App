import React, { useContext, useEffect } from "react"
import styled, { useTheme } from "styled-components"
import Navbar from "../Components/Shop/Navbar"
import Selector from "../Components/Shop/Selector"
import ProductsSlider from "../Components/Shop/ProductsSlider"
import { Main } from "../globalStyles"
import Image from "../assets/Tracé 6.png"
import { useParams } from "react-router"
import Modal from "../Components/Shop/Modal"
import { AnimatePresence, motion } from "framer-motion"
import { ProductsContext } from "../Context/ProductsProvider"
import { socket } from "../Services/socket"
import { toast } from "react-toastify"
import { Oval } from "react-loader-spinner"
import { TerminalContext } from "../Context/TerminalProvider"

interface messageProduct {
	data: Product
	message: string
}

interface TitleProps {
	size?: string
}

const Shop = () => {
	const theme = useTheme()
	const params = useParams()
	const { category, updateProductFromContext, products, productsLoading } = useContext(ProductsContext)
	const { terminalLoading } = useContext(TerminalContext)
	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.2
			}
		}
	}

	useEffect(() => {
		socket.on("unavailableProduct", (data: messageProduct) => {
			toast.warning(data.message)
			updateProductFromContext(data.data)
		})

		return () => {
			socket.off("unavailableProduct")
		}
	}, [products])
	console.log("productsLoading", productsLoading)
	console.log("terminalLoading", terminalLoading)
	if (productsLoading || terminalLoading) {
		return (
			<Center column background={theme.colors.background}>
				<Oval color="blue" height={110} width={110} ariaLabel="three-circles-rotating" />
				<Title size="3rem">All terminals are used, please wait</Title>
			</Center>
		)
	}

	return (
		<Container column background={theme.colors.background}>
			<AnimatePresence>{params.id && <Modal />}</AnimatePresence>
			<Navbar />
			<Flex>
				<Selector />
				<Left>
					<Wrapper>
						<AnimatePresence exitBeforeEnter>
							<Title key={category} initial="hidden" animate="show" exit="hidden" variants={variants}>
								{category}s
							</Title>
						</AnimatePresence>
						<img src={Image} alt="Line under title" />
					</Wrapper>
					<ProductsSlider />
				</Left>
			</Flex>
		</Container>
	)
}

const Container = styled(Main)`
	justify-content: initial;
	align-items: initial;
`
const Center = styled(Container)`
	align-items: center;
	justify-content: center;
	height: 100vh;
`
const Flex = styled.main`
	display: flex;
	height: 100%;
	gap: 3rem;
`
const Left = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: calc(100% - 250px);
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
	align-items: center;
	align-self: start;
`

const Title = styled(motion.h1)<TitleProps>`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme, size }) => (size ? size : theme.size.xl)};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

export default Shop
