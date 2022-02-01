import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router"
import styled, { useTheme } from "styled-components"
import { Main } from "../globalStyles"

type RowStyle = {
	flex: string
	background: string
	column?: boolean
	$cursor?: boolean
}

const Homepage = () => {
	const theme = useTheme()
	const navigate = useNavigate()

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

	const item = {
		hidden: { opacity: 0, y: -30 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8
			}
		}
	}

	const start = {
		hidden: { scale: 1.6, opacity: 0 },
		show: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.2,
				type: "spring",
				stiffness: 200
			}
		}
	}
	return (
		<AnimatePresence>
			<Main column initial="hidden" animate="show" exit="hidden" variants={variants}>
				<Row column flex="70%" background={theme.colors.primary}>
					<Title variants={item}>Order & Pay here</Title>
					<Line></Line>
					<Subtitle variants={item}>Fast & easy</Subtitle>
				</Row>
				<Row flex="10%" background={theme.colors.text}></Row>
				<Row flex="20%" $cursor background={theme.colors.secondary} onClick={() => navigate("/accounts")}>
					<Subtitle variants={start}>
						<motion.p whileHover={{ opacity: 0.6 }}>Touch to start</motion.p>
					</Subtitle>
				</Row>
			</Main>
		</AnimatePresence>
	)
}

const Row = styled(motion.div)<RowStyle>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: ${({ flex }) => flex};
	background-color: ${({ background }) => background};
	width: 100%;
	flex-direction: ${({ column }) => (column ? "column" : "row")};
	cursor: ${({ $cursor }) => ($cursor ? "pointer" : "initial")};
	gap: 0.5rem;
	position: relative;
	& > svg {
		position: absolute;
		top: 90px;
		left: 150px;
		height: 50px;
		width: 100%;
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
const Line = styled(motion.span)`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.text};
	width: 500px;
	height: 2px;
	opacity: 80%;
`
const Subtitle = styled(motion.div)`
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.sub};
	font-weight: 600;
	text-transform: uppercase;
	font-size: ${({ theme }) => theme.size.l};
	cursor: pointer;
`
export default Homepage
