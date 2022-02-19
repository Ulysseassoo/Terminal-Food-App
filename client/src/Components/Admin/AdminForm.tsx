import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

const variants = {
	hidden: { x: "100%" },
	show: {
		x: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.5
		}
	}
}

const AdminForm = () => {
	return (
		<Container initial="hidden" animate="show" exit="hidden" variants={variants}>
			AdminForm
		</Container>
	)
}

const Container = styled(motion.div)`
	position: absolute;
	z-index: 20;
	inset: 0;
	background: ${({ theme }) => theme.colors.background};
`

export default AdminForm
