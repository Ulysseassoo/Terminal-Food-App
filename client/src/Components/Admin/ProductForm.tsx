import { motion } from "framer-motion"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import styled from "styled-components"
import { CategoriesContext } from "../../Context/CategoryProvider"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { ProductsContext } from "../../Context/ProductsProvider"
import { createProduct, updateProduct } from "../../Services/APIs"
import SubmitButton from "../SubmitButton"
interface DataForm {
	price: number
	name: string
	description: string
	category: string
	calories: string
	ingredients: never[]
}

const ProductForm = () => {
	const { ingredients } = useContext(IngredientsContext)
	const { categories, categoriesLoading } = useContext(CategoriesContext)
	const { addNewProduct, setShowForm, selectedProduct, setSelectedProduct, products, updateProductFromContext } = useContext(ProductsContext)
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm<DataForm>()
	useEffect(() => {
		if (selectedProduct !== 0) {
			const product = products.find((item) => item.id === selectedProduct)!
			setValue("name", product.name)
			setValue("category", product.category.id.toString())
			setValue("calories", product.calories)
			setValue("description", product.description)
			setValue("price", product.price)
		}
		return () => {
			if (selectedProduct !== 0) setSelectedProduct(0)
		}
	}, [])
	const onSubmit = async (formData: DataForm) => {
		if (typeof formData.ingredients === "string") {
			formData.ingredients = Array.from(formData.ingredients)
		}
		const totalIngredients: Ingredient[] = formData.ingredients.map((data) => {
			const ingredient = ingredients.find((item) => item.id === parseInt(data))
			return ingredient!
		})

		const category: Category = categories.find((category) => category.id === parseInt(formData.category))!

		const token = localStorage.getItem("token")
		const formattedData: Product = { ...formData, custom: false, available: false, ingredients: totalIngredients, category: category }
		try {
			const { data, status } =
				selectedProduct !== 0 ? await updateProduct(formattedData, token!, selectedProduct) : await createProduct(formattedData, token!)
			if (status !== 200) throw new Error()
			if (selectedProduct !== 0) {
				updateProductFromContext(data)
				toast.success("Your product has been edited")
			} else {
				addNewProduct(data)
				toast.success("Your product has been created")
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
					<Input type="number" id="price" placeholder="price" {...register("price", { required: true })} />
				</Box>
				<Box>
					<Input type="text" id="description" placeholder="description" {...register("description", { required: true })} />
				</Box>
				<Box>
					<label htmlFor="category">Category</label>
					<select id="category" {...register("category")}>
						{!categoriesLoading &&
							categories.map((category) => {
								return (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								)
							})}
					</select>
				</Box>
				<Box>
					<Input type="text" id="calories" placeholder="calories" {...register("calories", { required: true })} />
				</Box>
				<Box>
					<p>Ingredients</p>
					<ScrollBox>
						{ingredients.map((ingredient) => {
							if (
								selectedProduct !== 0 &&
								products.find((product) => product.id === selectedProduct)?.ingredients.find((item) => item.id === ingredient.id)
							) {
								return (
									<Row key={ingredient.id}>
										<Input
											key={ingredient.id}
											type="checkbox"
											id={`${ingredient.name}`}
											value={ingredient.id}
											checked={true}
											{...register("ingredients", { required: true })}
										/>
										<label htmlFor={`${ingredient.name}`}>{ingredient.name}</label>
									</Row>
								)
							}
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

export default ProductForm
