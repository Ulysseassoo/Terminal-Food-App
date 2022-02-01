import React from "react"
import { Link } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { Main } from "../globalStyles"
import { User } from "@styled-icons/fa-regular/User"
import { AnimatePresence, motion } from "framer-motion"
import ButtonLink from "../Components/ButtonLink"
import ButtonList from "../Components/ButtonList"

const Accounts = () => {
	const theme = useTheme()

	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.5,
				staggerChildren: 0.5
			}
		}
	}

	return (
		<AnimatePresence>
			<Main column background={theme.colors.primary} initial="hidden" animate="show" exit="hidden" variants={variants}>
				<Row>
					<User /> <Title>Who are you ?</Title>
				</Row>
				<ButtonList />
			</Main>
		</AnimatePresence>
	)
}

const Row = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 1rem;
	width: 100%;
	justify-content: center;
	flex: 30%;
	& > svg {
		width: 50px;
		height: 100%;
		color: ${({ theme }) => theme.colors.text};
	}
`

const Title = styled(motion.h1)`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.xl};
	text-shadow: ${({ theme }) => theme.shadow.text};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
	text-transform: capitalize;
`

export default Accounts
