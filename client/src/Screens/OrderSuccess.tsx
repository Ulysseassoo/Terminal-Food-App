import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const OrderSuccess = () => {
	const [count, setCount] = useState(5)
	const navigate = useNavigate()
	useEffect(() => {
		const timerEnd = setInterval(() => {
			navigate("/")
		}, 5000)

		return () => clearInterval(timerEnd)
	}, [])

	useEffect(() => {
		const timer = setInterval(() => {
			setCount(count - 1)
		}, 1000)
		return () => clearInterval(timer)
	})

	return (
		<>
			<div>Your order is coming ! Thanks for ordering at Pizza Restaurant</div>
			<div>The terminal will disconnect in {count}</div>
		</>
	)
}

export default OrderSuccess
