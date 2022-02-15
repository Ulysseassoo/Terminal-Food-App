import React from "react"
import styled from "styled-components"
import { Main } from "../../globalStyles"
import Content from "./Dashboard"
import Sidebar from "./Sidebar"
import { Outlet, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Ingredients from "./Ingredients"
import Products from "./Products"
import { AnimatePresence } from "framer-motion"

const AdminHomepage = () => {
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

	return (
		<Container initial="hidden" animate="show" exit="hidden" variants={variants}>
			<Sidebar />
			<Outlet />
			<AnimatePresence exitBeforeEnter initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="products" element={<Products />} />
					<Route path="ingredients" element={<Ingredients />} />
				</Routes>
			</AnimatePresence>
		</Container>
	)
}

const Container = styled(Main)`
	justify-content: initial;
	align-items: initial;
`

export default AdminHomepage
