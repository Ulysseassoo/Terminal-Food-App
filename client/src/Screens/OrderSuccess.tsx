import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"

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
		<Container>
			<Title>Your order is coming ! Thanks for ordering at Pizza Restaurant</Title>
			<p>The terminal will disconnect in {count}</p>
		</Container>
	)
}

const Container = styled.main`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
	flex-direction: column;
`

const Title = styled.h1`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.colors.text};
	& + p {
		font-size: 1rem;
		color: ${({ theme }) => theme.colors.text};
	}
`

export default OrderSuccess
