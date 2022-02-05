import React, { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { Close } from "styled-icons/material"
import { Main } from "../../globalStyles"
import Image from "../../assets/pizzaz.png"
import { ProductsContext } from "../../Context/ProductsProvider"

const Modal = () => {
	const { id, category } = useParams()
	const navigate = useNavigate()
	const { products, productsLoading } = useContext(ProductsContext)!
	const numberId = parseInt(id!)
	const selectedProduct = products.find((product) => product.id === numberId)

	const variants = {
		hidden: { y: "-100%" },
		show: {
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.5
			}
		}
	}

	if (productsLoading) {
		return <></>
	}

	return (
		<Container column initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Close onClick={() => navigate("/menu")} />
			<Left>
				<Title>{selectedProduct!.name}</Title>
				<Line />
				<Wrapper>
					<ImageContainer>
						<img src={Image} alt="Product item image" />
					</ImageContainer>
					<Content>
						<Column>
							<Subtitle>Description</Subtitle>
							{selectedProduct!.description}
						</Column>
						<Column>
							<Subtitle>Ingredients</Subtitle>
							{selectedProduct!.ingredients.map((ingredient) => (
								<p>{ingredient.name} </p>
							))}
						</Column>
						<Row>
							<Subtitle>Price</Subtitle>
							<Total>{selectedProduct!.price} $</Total>
						</Row>
						<Row>
							{" "}
							<Button>Add to cart</Button>
						</Row>
					</Content>
				</Wrapper>
			</Left>
		</Container>
	)
}

const Container = styled(Main)`
	position: absolute;
	height: 100%;
	width: 100%;
	inset: 0;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 10;
	& svg {
		width: 50px;
		height: 50px;
		color: ${({ theme }) => theme.colors.text};
		position: absolute;
		top: 10px;
		right: 20px;
		z-index: 11;
		transition: 0.2 ease-in;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
`

const Left = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 4rem;
	gap: 3rem;
`

const Line = styled.span`
	display: inline-block;
	height: 2px;
	background-color: ${({ theme }) => theme.colors.text};
	width: 100%;
	opacity: 0.2;
`

const Title = styled.h2`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

const ImageContainer = styled.div`
	flex: 1;
	& img {
		height: 80%;
		width: 80%;
	}
`
const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	justify-content: space-between;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const Row = styled.div`
	display: flex;
	justify-content: space-between;
`

const Subtitle = styled.p`
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	font-family: ${({ theme }) => theme.fonts.sub};
`

const Total = styled.p`
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.secondary};
	font-weight: 600;
	font-family: ${({ theme }) => theme.fonts.sub};
`

const Button = styled.button`
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.text};
	padding: 0.4rem 3rem;
	text-transform: uppercase;
	border: none;
	font-weight: bold;
	cursor: pointer;
`

export default Modal
