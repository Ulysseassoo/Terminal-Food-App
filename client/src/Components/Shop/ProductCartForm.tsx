import { motion } from "framer-motion"
import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Close } from "styled-icons/material"
import { CartContext } from "../../Context/CartProvider"
import { CategoriesContext } from "../../Context/CategoryProvider"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { createProduct } from "../../Services/APIs"
import SubmitButton from "../SubmitButton"

interface Props {
	setShowAddForm: Dispatch<SetStateAction<boolean>>
}

interface DataForm {
	ingredients: never[]
}

const variants = {
	hidden: {
		x: "100%",
		transition: {
			type: "tween"
		}
	},
	show: {
		x: 0,
		transition: {
			type: "tween"
		}
	}
}

const ProductCartForm = ({ setShowAddForm }: Props) => {
	const { ingredients } = useContext(IngredientsContext)
	const { categories } = useContext(CategoriesContext)
	const { addProductToCart } = useContext(CartContext)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<DataForm>()

	const onSubmit = async (formData: DataForm) => {
		if (typeof formData.ingredients === "string") {
			formData.ingredients = Array.from(formData.ingredients)
		}
		const totalIngredients: Ingredient[] = formData.ingredients.map((data) => {
			const ingredient = ingredients.find((item) => item.id === parseInt(data))
			return ingredient!
		})

		const productCategory: Category = categories.find((category) => category.id === 1)!

		const customProduct: Product = {
			id: new Date().valueOf(),
			ingredients: totalIngredients,
			name: "Custom Pizza",
			custom: true,
			calories: "300kcal",
			description: "client products",
			price: 15,
			available: true,
			category: productCategory,
			image: null
		}
		addProductToCart(customProduct)
		setShowAddForm(false)
	}
	return (
		<Container initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Box>
				<Close onClick={() => setShowAddForm(false)} />
				<Title>Create your own product</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Box>
						<p>Ingredients</p>
						<ScrollBox>
							{ingredients.map((ingredient) => {
								return (
									<Row key={ingredient.id}>
										<Input
											key={ingredient.id}
											type="checkbox"
											id={`${ingredient.name}`}
											value={ingredient.id}
											{...register("ingredients", { required: true })}
										/>
										<label htmlFor={`${ingredient.name}`}>{ingredient.name}</label>
									</Row>
								)
							})}
						</ScrollBox>
					</Box>
					<SubmitButton content="Add To Cart" isSubmitting={isSubmitting} />
				</Form>
			</Box>
		</Container>
	)
}

const Container = styled(motion.div)`
	height: 100%;
	width: 500px;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 30;
	position: absolute;
	right: 0;
	padding: 2rem 2rem 1rem 2rem;
	gap: 1.5rem;
`

const Box = styled(motion.div)`
	height: 100%;
	width: 100%;
	position: relative;
	& svg {
		top: 0px;
		right: 0px;
		position: absolute;
		width: 25px;
		height: 25px;
		transition: 0.3s ease-in;
		&:hover {
			opacity: 0.8;
			cursor: pointer;
		}
	}
`

const Form = styled(motion.form)`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
`

const Row = styled(motion.div)`
	display: flex;
	gap: 0.5rem;
`

const ScrollBox = styled(motion.div)`
	overflow-y: scroll;
	height: 600px;
	scrollbar-width: thin;
`

const Input = styled(motion.input)`
	border: none;
	border-bottom: 2px solid ${({ theme }) => theme.colors.text};
	background-color: transparent;
	padding: 1rem 0.5rem;
	outline: transparent;
	font-family: ${({ theme }) => theme.fonts.normal};
	color: ${({ theme }) => theme.colors.text};
	text-shadow: ${({ theme }) => theme.shadow.text};
	font-size: ${({ theme }) => theme.size.m};
`

const Title = styled(motion.p)`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	text-transform: capitalize;
`

export default ProductCartForm
