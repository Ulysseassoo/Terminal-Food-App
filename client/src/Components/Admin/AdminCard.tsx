import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { StyledIcon } from "styled-icons/types"
import Counter from "../Counter"

interface Props {
	title: string
	data: number
	graph?: string
	$price?: boolean
	Icon: StyledIcon
}

const AdminCard = ({ title, data, graph, $price, Icon }: Props) => {
	return (
		<Container>
			<Icon />
			<Title>{title}</Title>
			<Data>
				<Counter from={0} to={data} />
				{$price ? " $" : ""}
			</Data>
		</Container>
	)
}

const Container = styled(motion.div)`
	flex: 1 0;
	box-shadow: ${({ theme }) => theme.shadow.box};
	height: 200px;
	border-radius: 0.5rem;
	padding: 1rem;
	text-align: center;
	& svg {
		width: 50px;
		height: 50px;
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.white};
		border-radius: 10px;
		padding: 0.5rem;
	}
`

const Title = styled(motion.p)`
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.size.m};
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	text-transform: capitalize;
`

const Data = styled(motion.span)`
	display: inline-block;
	font-size: ${({ theme }) => theme.size["2l"]};
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
`

export default AdminCard
