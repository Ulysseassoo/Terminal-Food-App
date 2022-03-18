import React, { useContext, useEffect } from "react"
import { OrdersContext } from "../../Context/OrdersProvider"
import { socket } from "../../Services/socket"
import styled from "styled-components"
import { Main } from "../../globalStyles"
import Content from "./Dashboard"
import Sidebar from "./Sidebar"
import { Outlet, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Ingredients from "./Ingredients"
import Products from "./Products"
import { AnimatePresence } from "framer-motion"
import { IngredientsContext } from "../../Context/IngredientsProvider"
import { toast } from "react-toastify"
import Terminals from "./Terminals"

const AdminHomepage = () => {
	const { orders, updateOrders, addNewOrder } = useContext(OrdersContext)
	const { refreshQuantity, ingredients, setIngredients } = useContext(IngredientsContext)

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

	useEffect(() => {
		socket.on("modifiedOrder", (data) => {
			updateOrders(data.data)
		})
		socket.on("newOrder", (order) => {
			addNewOrder(order.data)
		})
		socket.on("changedStock", (stock) => {
			if (stock.data.quantity === 0) {
				toast.warning(`${stock.data.ingredient.name} ingredient quantity reached 0`)
			}
			refreshQuantity(stock.data)
		})
		return () => {
			socket.off("modifiedOrder")
			socket.off("newOrder")
			socket.off("changedStock")
		}
	}, [orders, ingredients])

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
	background-color: ${({ theme }) => theme.colors.background};
`

export default AdminHomepage
