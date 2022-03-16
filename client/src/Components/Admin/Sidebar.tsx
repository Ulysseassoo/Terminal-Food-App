import { motion } from "framer-motion"
import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Dashboard, LogOut } from "styled-icons/boxicons-solid"
import { Production } from "styled-icons/fluentui-system-filled"
import { FoodMenu } from "@styled-icons/boxicons-regular"
import { FoodBank } from "styled-icons/material"
import { UserContext } from "../../Context/UserProvider"
import { socket } from "../../Services/socket"

const Sidebar = () => {
	const { sessionEnd } = useContext(UserContext)
	const navigate = useNavigate()
	const loggingOut = () => {
		sessionEnd()
		socket.emit("user_disconnect")
		navigate("/accounts")
	}
	return (
		<Container>
			<Title>Fast Pizzas</Title>
			<Links>
				<AnimateBox>
					<CustomLink to="dashboard">
						<Dashboard />
						<LinkName>dashboard</LinkName>
					</CustomLink>
				</AnimateBox>
				<AnimateBox>
					<CustomLink to="products">
						<Production />
						<LinkName>products</LinkName>
					</CustomLink>
				</AnimateBox>
				<AnimateBox>
					<CustomLink to="ingredients">
						<FoodBank />
						<LinkName>ingredients</LinkName>
					</CustomLink>
				</AnimateBox>
				<AnimateBox>
					<CustomLink to="orders">
						<FoodMenu />
						<LinkName>orders</LinkName>
					</CustomLink>
				</AnimateBox>
			</Links>
			<Logout whileHover={{ opacity: 0.8 }} onClick={() => loggingOut()}>
				{" "}
				<LogOut /> Logout
			</Logout>
		</Container>
	)
}

const Container = styled(motion.aside)`
	width: 300px;
	background-color: ${({ theme }) => theme.colors.background};
	box-shadow: rgba(0, 0, 0, 0.05) 1px 0px 2px 0px;
	display: flex;
	align-items: center;
	flex-direction: column;
	z-index: 40;
`

const Title = styled(motion.p)`
	padding-top: 0.5rem;
	font-size: ${({ theme }) => theme.size.l};
	color: ${({ theme }) => theme.colors.primary};
	text-shadow: ${({ theme }) => theme.shadow.text};
	text-transform: uppercase;
	font-family: ${({ theme }) => theme.fonts.title};
`

const Links = styled(motion.div)`
	width: 100%;
	font-family: ${({ theme }) => theme.fonts.normal};
	height: fit-content;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 2rem;
	gap: 1.5rem;
`

const LinkName = styled.span`
	display: inline-block;
	text-transform: capitalize;
	font-family: inherit;
	color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme }) => theme.size.s};
	transition: 0.3s ease all;
	position: relative;
`

const CustomLink = styled(NavLink)`
	width: 100%;
	display: inline-flex;
	align-items: center;
	gap: 3rem;
	height: 100%;
	text-decoration: none;
	transition: 0.2s ease;
	padding: 0.5rem;
	border-radius: 0.3rem;
	position: relative;
	& svg {
		width: 28px;
		height: 28px;
		color: ${({ theme }) => theme.colors.text};
		position: relative;
		transition: 0.3s ease all;
	}
	&.active {
		background-color: ${({ theme }) => theme.colors.lightPrimary};
	}
	&:hover:not(.active) {
		& > ${LinkName} {
			transform: translateX(10px);
			color: ${({ theme }) => theme.colors.primary};
		}
		& > svg {
			transform: translateX(10px);
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`

const AnimateBox = styled(motion.div)`
	width: 100%;
	height: 60px;
	display: inline-block;
`

const Logout = styled(motion.div)`
	display: inline-flex;
	align-items: center;
	color: ${({ theme }) => theme.colors.error};
	gap: 3rem;
	width: 100%;
	padding: 2.5rem;
	margin-top: auto;
	cursor: pointer;
	& svg {
		width: 28px;
		height: 28px;
	}
`

export default Sidebar
