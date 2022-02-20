import { motion } from "framer-motion"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import styled from "styled-components"
import { CategoriesContext } from "../../Context/CategoryProvider"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { ProductsContext } from "../../Context/ProductsProvider"
import { createIngredient, createProduct, updateIngredient, updateProduct } from "../../Services/APIs"
import SubmitButton from "../SubmitButton"
interface DataForm {
	name: string
	stock: number
	important: boolean
}

const IngredientForm = () => {
	const { ingredients, addNewIngredient, updateIngredientFromContext } = useContext(IngredientsContext)
	const { setShowForm, selectedProduct, setSelectedProduct } = useContext(ProductsContext)
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm<DataForm>()
	useEffect(() => {
		if (selectedProduct !== 0) {
			const ingredient = ingredients.find((item) => item.id === selectedProduct)!
			setValue("name", ingredient.name)
		}
		return () => {
			if (selectedProduct !== 0) setSelectedProduct(0)
		}
	}, [])
	const onSubmit = async (formData: DataForm) => {
		const token = localStorage.getItem("token")
		const stock = { quantity: formData.stock }
		const formattedData: Ingredient = { ...formData, important: formData.important === null ? false : true, stock: stock }
		try {
			const { data, status } =
				selectedProduct !== 0 ? await updateIngredient(formattedData, token!, selectedProduct) : await createIngredient(formattedData, token!)
			if (status !== 200) throw new Error()
			if (selectedProduct !== 0) {
				updateIngredientFromContext(data)
				toast.success("Your ingredient has been edited")
			} else {
				addNewIngredient(data)
				toast.success("Your ingredient has been created")
			}
			setShowForm(false)
		} catch (error: any) {
			toast.error(error || error.message || error.data.errors[0].msg)
		}
	}
	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<Input type="text" id="name" placeholder="name" {...register("name", { required: true })} />
				</Box>
				<Box>
					<Input type="number" id="quantity" placeholder="quantity" {...register("stock", { required: true })} />
				</Box>
				<Box>
					<Row>
						<Input type="radio" id="important" {...register("important", { required: false })} />
						<label htmlFor="important">Ingredient is important ?</label>
					</Row>
				</Box>
				{selectedProduct !== 0 && <SubmitButton content="Edit" isSubmitting={isSubmitting} />}
				{selectedProduct === 0 && <SubmitButton content="Add" isSubmitting={isSubmitting} />}
			</Form>
		</Container>
	)
}

const Container = styled(motion.div)`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Form = styled(motion.form)`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 500px;
`

const Row = styled(motion.div)`
	display: flex;
	gap: 0.5rem;
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

const Box = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`

const ScrollBox = styled(motion.div)`
	overflow-y: scroll;
	height: 100px;
	scrollbar-width: thin;
`

export default IngredientForm
