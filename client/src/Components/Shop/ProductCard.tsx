import { AnimatePresence, motion } from "framer-motion"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import styled, { css, useTheme } from "styled-components"
import { PlusSquare } from "styled-icons/bootstrap"
import { PlusSquareFill } from "styled-icons/bootstrap"
import ProductImage from "../../assets/pizzaz.png"
import { CartContext } from "../../Context/CartProvider"
import { Trash } from "@styled-icons/bootstrap"
import { MinusSquare } from "@styled-icons/fa-regular"
import Modal from "./Modal"

interface Props {
	$cart?: boolean
	id: number
	calories: string
	category: Category
	name: string
	price: number
	description: string
	custom: boolean
	available: boolean
	ingredients: Ingredient[]
	quantity?: number
	i: number
}

interface CartProps {
	$cart?: boolean
	$available?: boolean
}

const ProductCard = ({ id, calories, category, name, price, description, custom, ingredients, $cart, quantity, available, i }: Props) => {
	const variants = {
		hidden: { opacity: 0, x: 10 * i },
		show: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.2
			}
		}
	}
	const theme = useTheme()
	const navigate = useNavigate()
	const [editMode, setEditMode] = useState(false)
	const { addProductToCart, deleteProductFromCart, reduceItemQuantity } = useContext(CartContext)!

	const addProduct = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		event.stopPropagation()
		if (!available) return toast.warning("This Product is no more available !")
		addProductToCart({ id, calories, category, name, price, description, custom, ingredients, available })
		toast.success("Product added to cart !")
	}

	const showItem = () => {
		if (!available) return toast.warning("This Product is no more available !")
		navigate(`${category.name}/${id}`)
	}

	if ($cart) {
		return (
			<AnimatePresence>
				<Container $cart variants={variants}>
					<Trash onClick={() => deleteProductFromCart(id)} />
					<ImageContainer $cart>
						<img src={ProductImage} alt="Pizza Product" />
					</ImageContainer>
					<Content $cart>
						<SubTitle $cart>{name}</SubTitle>
						{custom && <Tag>Custom Product</Tag>}
						<Text $cart> {calories}</Text>
						<QuantityContainer>
							<PlusSquare onClick={() => addProductToCart({ id, calories, category, name, price, description, custom, ingredients, available })} />
							<Counter>{quantity}</Counter>
							<MinusSquare
								onClick={() => {
									quantity! >= 1 && reduceItemQuantity(id)
								}}
							/>
						</QuantityContainer>
						<Price $cart>{price * quantity!}$</Price>
						<Button onClick={() => setEditMode(true)}>Edit</Button>
					</Content>
				</Container>
				{editMode && <Modal cartItemId={id} setEditMode={setEditMode} key={id} />}
			</AnimatePresence>
		)
	}

	return (
		<Container
			whileHover={{ y: -5, boxShadow: `${theme.colors.primaryShadow} 0px 2px 8px` }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			onClick={() => showItem()}
			$available={available}>
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
			height: 200px;
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
	${({ $available }) =>
		$available === false &&
		css`
			filter: blur(4.19px) brightness(0.79) contrast(0.98) grayscale(1) invert(0.12);
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
			gap: 0.2rem;
		`}
`

const SubTitle = styled.p<CartProps>`
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.m};
	color: inherit;
	font-weight: 600;
`

const Tag = styled.p`
	padding: 0.2rem;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme }) => theme.size.s};
	font-family: ${({ theme }) => theme.fonts.sub};
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

const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
	& svg {
		width: 20px;
		height: 20px;
		color: ${({ theme }) => theme.colors.text};
		cursor: pointer;
		transition: 0.3 ease-in-out;
		&:hover {
			opacity: 0.6;
		}
	}
`

const Counter = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	text-shadow: ${({ theme }) => theme.shadow.text};
	font-size: ${({ theme }) => theme.size.m};
`

const Button = styled.button`
	width: 100%;
	font-size: ${({ theme }) => theme.size.s};
	border: none;
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme }) => theme.colors.text};
	border-radius: 0.5rem;
	cursor: pointer;
	transition: 0.3s ease-in;
	&:hover {
		opacity: 0.8;
	}
`

export default ProductCard
