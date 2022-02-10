import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import styled from "styled-components"
import calculateTimeLeft from "../../Helpers/useTimer"

interface Props {
	date: string
}

const Timer = ({ date }: Props) => {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date))

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft(date))
		}, 1000)
		return () => clearTimeout(timer)
	})

	const timerComponents: any = []

	Object.keys(timeLeft).forEach((interval, index) => {
		if (!timeLeft[interval]) {
			return
		}

		timerComponents.push(
			<Span key={date + index}>
				{timeLeft[interval]} {interval}{" "}
			</Span>
		)
	})

	return <div>{timerComponents}</div>
}

const Span = styled(motion.span)`
	font-family: ${({ theme }) => theme.fonts.normal};
	font-weight: 600;
`

export default Timer
