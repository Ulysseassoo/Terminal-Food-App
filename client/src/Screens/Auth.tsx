import { AnimatePresence } from "framer-motion"
import React from "react"
import styled, { useTheme } from "styled-components"
import Form from "../Components/Auth/Form"
import { Main } from "../globalStyles"
import { ArrowLeftSquare } from "@styled-icons/bootstrap/ArrowLeftSquare"
import { useNavigate } from "react-router"
import { Admin } from "@styled-icons/remix-line/Admin"
import { Kitchen } from "@styled-icons/material"

type Props = {
	admin?: boolean
}

const Auth = ({ admin }: Props) => {
	const theme = useTheme()
	const navigate = useNavigate()

	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.5
			}
		}
	}

	return (
		<AnimatePresence>
			<Container column background={theme.colors.primary} initial="hidden" animate="show" exit="hidden" variants={variants}>
				<ArrowLeftSquare onClick={() => navigate("/accounts")} />
				{admin && (
					<Title>
						<Admin />
						Admin
					</Title>
				)}
				{!admin && (
					<Title>
						<Kitchen />
						Kitchen
					</Title>
				)}
				<Form />
			</Container>
		</AnimatePresence>
	)
}

const Container = styled(Main)`
	positon: relative;
	& > svg {
		width: 50px;
		height: 50px;
		position: absolute;
		top: 10px;
		left: 20px;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.text};
	}
`

const Title = styled.h1`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.xl};
	text-shadow: ${({ theme }) => theme.shadow.text};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
	display: inline-flex;
	align-items: center;
	gap: 0.8rem;
	& > svg {
		width: 60px;
		height: 60px;
	}
`
export default Auth
