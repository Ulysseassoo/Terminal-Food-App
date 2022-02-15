import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import ProductCard from "./ProductCard"
import { AnimatePresence, motion } from "framer-motion"
import { ProductsContext } from "../../Context/ProductsProvider"

interface SliderProps {
	ref: any
}

const ProductsSlider = () => {
	const [width, setWidth] = useState(0)
	const slider = useRef<HTMLDivElement>()
	const { products, productsLoading, category } = useContext(ProductsContext)!
	useEffect(() => {
		if (null !== slider.current) {
			setWidth(slider.current?.scrollWidth! - slider.current?.offsetWidth!)
		}
	}, [])

	if (productsLoading) {
		return <></>
	}

	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.3,
				staggerChildren: 0.3
			}
		}
	}

	return (
		<Container>
			<MotionSlider
				drag="x"
				ref={slider}
				dragConstraints={{ right: 0, left: -width }}
				variants={variants}
				initial="hidden"
				animate="show"
				exit="hidden">
				{products.map((product, i) => {
					if (!product.custom && product.category.name === category) {
						return <ProductCard {...product} key={product.id} i={i} />
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
