import React, { useEffect } from "react"
import styled from "styled-components"
import { ArrowIosUpwardOutline } from "@styled-icons/evaicons-outline/ArrowIosUpwardOutline"
import { ArrowIosDownwardOutline } from "styled-icons/evaicons-outline"
import { DrinkToGo, FoodPizza } from "styled-icons/fluentui-system-filled"
import { getProducts } from "../../Services/APIs"

interface CardProps {
	$active?: boolean
}

const Selector = () => {
	return (
		<Container>
			<Wrapper>
				<IconContainer>
					<ArrowIosUpwardOutline />
				</IconContainer>
				<Icons>
					<Card $active>
						<FoodPizza />
						<p>Pizzas</p>
					</Card>
					<Card>
						<DrinkToGo />
						<p>Drinks</p>
					</Card>
				</Icons>
				<IconContainer>
					<ArrowIosDownwardOutline />
				</IconContainer>
			</Wrapper>
		</Container>
	)
}

const Container = styled.aside`
	width: 250px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Wrapper = styled.div`
	width: 140px;
	height: 90%;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.white};
`

const IconContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2.5rem;
	cursor: pointer;
`

const Icons = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.4rem;
`

const Card = styled.div<CardProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.2rem;
	width: 100%;
	height: 120px;
	border-radius: 0.4rem;
	transition: 0.3s ease;
	background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.white)};
	& > svg {
		color: ${({ theme }) => theme.colors.text};
		height: 50px;
		wdith: 50px;
	}
	& p {
		color: ${({ theme }) => theme.colors.text};
		font-size: ${({ theme }) => theme.size.m};
		font-weight: 600;
		font-family: ${({ theme }) => theme.fonts.sub};
	}
`

export default Selector
