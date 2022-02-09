import { motion } from "framer-motion"
import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import styled from "styled-components"
import { UserContext } from "../../Context/UserProvider"
import { adminLogin, kitchenLogin, userLogin } from "../../Services/APIs"
import SubmitButton from "../SubmitButton"

const Form = () => {
	const { pathname } = useLocation()
	const { setUser, user } = useContext(UserContext)
	const navigate = useNavigate()
	interface DataForm {
		email: string
		password: string
	}

	interface responseData {
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
			setUser(data.data)
			toast.success("You are now connected !")
			pathname === "/admin" ? navigate("/admin/dashboard") : pathname === "/user" ? navigate("/menu") : navigate("/kitchen/homepage")
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
					{...register("email", {
						required: "Provide an email",
						minLength: {
							value: 4,
							message: "You email should be at least 4 letters long."
						}
					})}
				/>
				<Errors>{errors.email?.message}</Errors>
				<Input
					type="password"
					placeholder="password"
					{...register("password", {
						required: "Provide a password",
						minLength: {
							value: 4,
							message: "Your password should be at least 4 letters long"
						}
					})}
				/>
				<Errors>{errors.password?.message}</Errors>
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
const Errors = styled.p`
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.normal};
`
export default Form
