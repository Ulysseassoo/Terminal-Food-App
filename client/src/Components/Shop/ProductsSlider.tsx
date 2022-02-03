import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import ProductCard from "./ProductCard"
import { motion } from "framer-motion"

interface SliderProps {
	ref: any
}

interface Current {
	scrollWidth: number
	offsetWidth: number
}

const ProductsSlider = () => {
	const [width, setWidth] = useState(0)
	const slider = useRef<HTMLDivElement>()

	useEffect(() => {
		if (null !== slider.current) {
			setWidth(slider.current?.scrollWidth! - slider.current?.offsetWidth!)
		}
	}, [])

	return (
		<Container>
			<MotionSlider drag="x" ref={slider} dragConstraints={{ right: 0, left: -width }}>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</MotionSlider>
		</Container>
	)
}

const Container = styled(motion.div)`
	height: 100%;
	justify-content: center;
	display: flex;
	overflow: hidden;
	width: 100%;
	padding: 1rem;
`

const MotionSlider = styled(motion.div)<SliderProps>`
	display: flex;
	width: 100%;
	height: 100%;
	flex-wrap: nowrap;
	align-items: center;
	gap: 2rem;
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
`

export default ProductsSlider
