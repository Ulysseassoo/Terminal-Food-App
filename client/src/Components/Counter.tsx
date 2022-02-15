import { animate } from "framer-motion"
import React, { useEffect, useRef } from "react"

interface Props {
	from: number
	to: number
}

const Counter = ({ from, to }: Props) => {
	const nodeRef = useRef<null | HTMLParagraphElement>(null)

	useEffect(() => {
		const node = nodeRef.current

		const controls = animate(from, to, {
			duration: 1.3,
			onUpdate(value) {
				node!.textContent = value.toFixed(0)
			}
		})

		return () => controls.stop()
	}, [from, to])

	return <span ref={nodeRef} />
}

export default Counter
