import { motion } from "framer-motion"
import React, { useState } from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"

const ButtonList = () => {
	const buttonData = [
		{
			name: "User",
			path: "/user"
		},
		{
			name: "Admin",
			path: "/admin"
		},
		{
			name: "Kitchen",
			path: "/kitchen"
		}
	]
	return (
		<Container>
			{buttonData.map((element, index) => {
				return <ButtonLink {...element} key={index} />
			})}
		</Container>
	)
}

const Container = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	align-items: center;
	justify-content: space-evenly;
	gap: 6rem;
	padding: 4rem;
	flex: 70%;
`

export default ButtonList
