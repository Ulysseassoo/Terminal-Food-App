import { useEffect, useState } from "react"
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
			<span key={date + index}>
				{timeLeft[interval]} {interval}{" "}
			</span>
		)
	})

	return <div>{timerComponents}</div>
}

export default Timer
