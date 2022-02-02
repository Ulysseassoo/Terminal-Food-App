import { motion } from "framer-motion"
import styled, { useTheme } from "styled-components"
import { Oval } from "react-loader-spinner"

type Props = {
	content: string
	isSubmitting: boolean
}

const SubmitButton = ({ content, isSubmitting }: Props) => {
	const theme = useTheme()
	if (isSubmitting) {
		return (
			<Container type="submit">
				<Oval color={theme.colors.primary} height={25} width={25} />
			</Container>
		)
	}
	return (
		<Container type="submit" whileTap={{ boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.3)" }} transition={{ duration: 0.3 }}>
			{content}
		</Container>
	)
}

const Container = styled(motion.button)`
	margin-top: 2.5rem;
	font-family: ${({ theme }) => theme.fonts.normal};
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme }) => theme.size.m};
	border: none;
	padding: 0.75rem;
	cursor: pointer;
	box-shadow: ${({ theme }) => theme.shadow.box};
	display: inline-flex;
	justify-content: center;
	align-items: center;
`

export default SubmitButton
