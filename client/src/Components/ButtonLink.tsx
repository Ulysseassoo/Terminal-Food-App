import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { Link } from "react-router-dom"
import styled, { useTheme } from "styled-components"

type Props = {
	name: string
	path: string
}

const ButtonLink = ({ name, path }: Props) => {
	const theme = useTheme()
	return (
		<Container whileHover={{ backgroundColor: theme.colors.hoverPrimary, color: theme.colors.text }}>
			<LinkText to={path}>{name}</LinkText>
		</Container>
	)
}

const LinkText = styled(Link)`
	text-decoration: none;
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.l};
	font-weight: 600;
	color: inherit;
	width: 100%;
	height: 100%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	transition: 0.3;
`

const Container = styled(motion.button)`
	flex: 1;
	height: 110px;
	border-radius: 0.4rem;
	border: 1px solid ${({ theme }) => theme.colors.text};
	position: relative;
	background-color: ${({ theme }) => theme.colors.text};
	color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;
`

export default ButtonLink
