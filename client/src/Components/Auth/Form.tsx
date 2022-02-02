import { motion } from "framer-motion"
import React from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router"
import { toast } from "react-toastify"
import styled from "styled-components"
import { adminLogin, kitchenLogin, userLogin } from "../../Services/APIs"
import SubmitButton from "../SubmitButton"

const Form = () => {
	const { pathname } = useLocation()
	type DataForm = {
		email: string
		password: string
	}

	type responseData = {
		status: number
		token: string
		data: {
			email: string
			role: string
		}
	}
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<DataForm>()
	const onSubmit = async (formData: DataForm) => {
		try {
			const { data }: { data: responseData } =
				pathname === "/admin" ? await adminLogin(formData) : pathname === "/user" ? await userLogin(formData) : await kitchenLogin(formData)
			localStorage.setItem("token", data.token)
			toast.success("You are now connected !")
		} catch (error: any) {
			toast.error(error.response.data.data)
		}
	}
	return (
		<Container>
			<AuthForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					aria-invalid={errors.email ? "true" : "false"}
					type="email"
					placeholder="email"
					{...register("email", { required: true, minLength: 4 })}
				/>
				<Input type="password" placeholder="password" {...register("password", { required: true, minLength: 4 })} />
				<SubmitButton content="Login" isSubmitting={isSubmitting} />
			</AuthForm>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 1rem;
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Input = styled.input`
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

const AuthForm = styled.form`
	width: 450px;
	height: 550px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	justify-content: center;
`
const Submit = styled(motion.input)`
	margin-top: 2.5rem;
	font-family: ${({ theme }) => theme.fonts.normal};
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme }) => theme.size.m};
	border: none;
	padding: 0.75rem;
	cursor: pointer;
	box-shadow: ${({ theme }) => theme.shadow.box};
`
export default Form
