import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { Close } from "styled-icons/material"
import { Main } from "../../globalStyles"
import Image from "../../assets/pizzaz.png"
import { ProductsContext } from "../../Context/ProductsProvider"
import { CartContext } from "../../Context/CartProvider"
import { toast } from "react-toastify"
import { PlusCircle } from "@styled-icons/boxicons-solid/PlusCircle"
import { MinusCircle } from "@styled-icons/boxicons-solid/MinusCircle"
import _ from "lodash"

interface Props {
	cartItemId?: number
	setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ cartItemId, setEditMode }: Props) => {
	const { id, category } = useParams()
	const navigate = useNavigate()
	const { products, productsLoading } = useContext(ProductsContext)!
	const { addProductToCart, cart, updateCartProduct } = useContext(CartContext)!
	const numberId = parseInt(id!)
	const selectedProduct = cartItemId
		? cart.find((item) => item.product.id === cartItemId)?.product
		: products.find((product) => product.id === numberId)
	const [customProduct, setCustomProduct] = useState<Product>(selectedProduct!)

	useEffect(() => {
		setCustomProduct(selectedProduct!)
	}, [productsLoading])
	const variants = {
		hidden: {
			y: "-100%",
			transition: {
				duration: 0.6,
				staggerChildren: 0.5
			}
		},
		show: {
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.5
			}
		}
	}

	const addProduct = (payload: Product | null = null) => {
		const objectsEqual = _.isEqual(customProduct, selectedProduct!)
		if (payload?.id) {
			updateCartProduct({ ...payload, custom: objectsEqual ? false : true })
			toast.success("Product updated !")
			setEditMode!(false)
			return
		}
		if (!objectsEqual) {
			addProductToCart({ ...customProduct, custom: true, id: new Date().valueOf() })
		} else {
			addProductToCart(customProduct)
		}
		toast.success("Product added to cart !")
		navigate("/menu")
	}

	const removeIngredientFromProduct = (id: number) => {
		if (customProduct.ingredients.length <= 1) return toast.error("You need to have at least 1 ingredient")
		const selectedIngredient = customProduct.ingredients.find((ingredient) => ingredient.id === id)
		if (selectedIngredient?.important) return toast.error("You can't delete an essential ingredient !")
		const modifiedProduct = { ...customProduct, ingredients: customProduct.ingredients.filter((ingredient) => ingredient.id !== id) }
		setCustomProduct(modifiedProduct)
	}

	if (productsLoading) {
		return <></>
	}

	if (cartItemId !== undefined) {
		return (
			<OtherContainer column initial="hidden" animate="show" exit="hidden" variants={variants}>
				<Close onClick={() => setEditMode!(false)} />
				<Left>
					<Title>{customProduct.name}</Title>
					<Line />
					<Wrapper>
						<Content>
							<Column>
								<Subtitle>Description</Subtitle>
								{customProduct.description}
							</Column>
							<Column>
								<Subtitle>Ingredients</Subtitle>
								{customProduct.ingredients.map((ingredient) => (
									<IngredientsContainer key={ingredient.id}>
										{/* <PlusCircle /> */}
										<MinusCircle onClick={() => removeIngredientFromProduct(ingredient.id)} />
										<p key={ingredient.id}>{ingredient.name} </p>
									</IngredientsContainer>
								))}
							</Column>
							<Row>
								<Subtitle>Price</Subtitle>
								<Total>{customProduct.price} $</Total>
							</Row>
							<Row>
								<Button onClick={() => addProduct(customProduct)}>Update</Button>
							</Row>
						</Content>
					</Wrapper>
				</Left>
			</OtherContainer>
		)
	}

	return (
		<Container column initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Close onClick={() => navigate("/menu")} />
			<Left>
				<Title>{customProduct?.name}</Title>
				<Line />
				<Wrapper>
					<ImageContainer>
						<img src={Image} alt="Product item image" />
					</ImageContainer>
					<Content>
						<Column>
							<Subtitle>Description</Subtitle>
							{customProduct?.description}
						</Column>
						<Column>
							<Subtitle>Ingredients</Subtitle>
							{customProduct?.ingredients.map((ingredient) => (
								<IngredientsContainer key={ingredient.id}>
									{/* <PlusCircle /> */}
									<MinusCircle onClick={() => removeIngredientFromProduct(ingredient.id)} />
									<p key={ingredient.id}>{ingredient.name} </p>
								</IngredientsContainer>
							))}
						</Column>
						<Row>
							<Subtitle>Price</Subtitle>
							<Total>{customProduct?.price} $</Total>
						</Row>
						<Row>
							{" "}
							<Button onClick={() => addProduct()}>Add to cart</Button>
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
	& > svg {
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

const OtherContainer = styled(Container)`
	justify-content: initial;
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

const IngredientsContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 1rem;
	& > svg {
		height: 20px;
		width: 20px;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.error};
		/* &:first-child {
			color: ${({ theme }) => theme.colors.success};
		} */
	}
`

export default Modal
