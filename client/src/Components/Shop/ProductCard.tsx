import { motion } from "framer-motion"
import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import styled, { css, useTheme } from "styled-components"
import { PlusSquareFill } from "styled-icons/bootstrap"
import ProductImage from "../../assets/pizzaz.png"
import { CartContext } from "../../Context/CartProvider"
import { Trash } from "@styled-icons/bootstrap"

interface Props {
	$cart?: boolean
	id: number
	calories: string
	category: Category
	name: string
	price: number
	description: string
	custom: boolean
	ingredients: Ingredient[]
}

interface CartProps {
	$cart?: boolean
}

const ProductCard = ({ id, calories, category, name, price, description, custom, ingredients, $cart }: Props) => {
	const theme = useTheme()
	const navigate = useNavigate()
	const { addProductToCart, deleteProductFromCart } = useContext(CartContext)!

	const addProduct = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		event.stopPropagation()
		addProductToCart({ id, calories, category, name, price, description, custom, ingredients })
		toast.success("Product added to cart !")
	}

	if ($cart) {
		return (
			<Container $cart>
				<Trash onClick={() => deleteProductFromCart(id)} />
				<ImageContainer $cart>
					<img src={ProductImage} alt="Pizza Product" />
				</ImageContainer>
				<Content $cart>
					<SubTitle $cart>{name}</SubTitle>
					<Text $cart> {calories}</Text>
					<Price $cart>{price}$</Price>
				</Content>
			</Container>
		)
	}

	return (
		<Container
			whileHover={{ y: -5, boxShadow: `${theme.colors.primaryShadow} 0px 2px 8px` }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			onClick={() => navigate(`${category.name}/${id}`)}>
			<ImageContainer>
				<img src={ProductImage} alt="Pizza Product" />
			</ImageContainer>
			<Content>
				<SubTitle>{name}</SubTitle>
				<Text>{calories}</Text>
				<Line />
				<PriceContainer>
					<Price>{price}$</Price>
					<PlusSquareFill onClick={(event) => addProduct(event)} />
				</PriceContainer>
			</Content>
		</Container>
	)
}

const Container = styled(motion.div)<CartProps>`
	height: 350px;
	width: 360px;
	min-width: 360px;
	border-radius: 0.5rem;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
	padding: 1rem;
	position: relative;
	color: ${({ theme }) => theme.colors.text};
	cursor: pointer;
	${({ $cart }) =>
		$cart &&
		css`
			height: 180px;
			box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
			cursor: initial;
			min-width: 100%;
			width: 100%;
			display: flex;
			background-color: ${({ theme }) => theme.colors.white};
			gap: 1.25rem;
			& > svg {
				width: 25px;
				height: 25px;
				position: absolute;
				top: 10px;
				right: 20px;
				color: ${({ theme }) => theme.colors.error};
				cursor: pointer;
			}
		`}
`

const ImageContainer = styled(motion.div)<CartProps>`
	height: 150px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: -100px;
	user-select: none;
	& img {
		width: 70%;
		user-select: none;
	}
	${({ $cart }) =>
		$cart &&
		css`
			top: initial;
			flex: 1;
			height: 100%;
			width: 100%;
			padding: 1rem;
			& img {
				width: 100%;
				object-fit: content;
			}
		`}
`

const Content = styled.div<CartProps>`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 0.8rem;
	${({ $cart }) =>
		$cart &&
		css`
			flex: 1;
			height: 100%;
			width: 100%;
			justify-content: center;
			align-items: start;
		`}
`

const SubTitle = styled.p<CartProps>`
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.m};
	color: inherit;
	font-weight: 600;
`

const Text = styled.span<CartProps>`
	display: inline-block;
	color: ${({ theme }) => theme.colors.secondary};
	font-family: ${({ theme }) => theme.fonts.normal};
	${({ $cart }) =>
		$cart &&
		css`
			color: ${({ theme }) => theme.colors.backgroundShadow};
		`}
`

const Line = styled.span`
	display: inline-block;
	width: 92%;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.text};
	opacity: 0.1;
`

const PriceContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
	& svg {
		color: ${({ theme }) => theme.colors.primary};
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
`

const Price = styled.p<CartProps>`
	display: contents;
	font-weight: 600;
	font-family: ${({ theme }) => theme.fonts.normal};
	color: inherit;
	font-size: ${({ theme }) => theme.size.l};
	${({ $cart }) =>
		$cart &&
		css`
			font-size: ${({ theme }) => theme.size.m};
			color: ${({ theme }) => theme.colors.secondary};
		`}
`

export default ProductCard
