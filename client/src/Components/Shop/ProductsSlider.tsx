import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import ProductCard from "./ProductCard"
import { motion } from "framer-motion"
import { ProductsContext } from "../../Context/ProductsProvider"

interface SliderProps {
	ref: any
}

const ProductsSlider = () => {
	const [width, setWidth] = useState(0)
	const slider = useRef<HTMLDivElement>()
	const { products, productsLoading } = useContext(ProductsContext)!
	useEffect(() => {
		if (null !== slider.current) {
			setWidth(slider.current?.scrollWidth! - slider.current?.offsetWidth!)
		}
	}, [])

	if (productsLoading) {
		return <></>
	}

	return (
		<Container>
			<MotionSlider drag="x" ref={slider} dragConstraints={{ right: 0, left: -width }}>
				{products.map((product) => {
					if (!product.custom) {
						return <ProductCard {...product} key={product.id} />
					}
				})}
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
	padding-bottom: 3rem;
	overflow-x: scroll;
	scrollbar-width: thin;
`

const MotionSlider = styled(motion.div)<SliderProps>`
	display: flex;
	width: 100%;
	height: 100%;
	flex-wrap: nowrap;
	align-items: end;
	gap: 2rem;
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
`

export default ProductsSlider
