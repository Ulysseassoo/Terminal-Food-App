import React, { useContext, useEffect } from "react"
import { OrdersContext } from "../../Context/OrdersProvider"
import { Main } from "../../globalStyles"
import { updateOrder } from "../../Services/APIs"
import socketClient from "socket.io-client"
import Timer from "./Timer"

const KitchenHomepage = () => {
	const { ordersLoading, orders, updateOrders, addNewOrder } = useContext(OrdersContext)
	const ENDPOINT = "localhost:3500"

	const orderDone = async (order: Order) => {
		const token = localStorage.getItem("token")
		const orderUpdated: Order = { ...order, state: { ...order.state, id: 2 } }
		const result = await updateOrder(token!, orderUpdated)
	}

	useEffect(() => {
		const socket = socketClient(ENDPOINT)
		socket.on("modifiedOrder", (data) => {
			updateOrders(data.data)
		})
		socket.on("newOrder", (order) => {
			addNewOrder(order.data)
		})
		return () => {
			socket.disconnect()
		}
	}, [orders])

	if (ordersLoading) return <>Loading...</>

	return (
		<Main column>
			<div>KitchenHomepage</div>
			<div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
				{orders.map((order) => {
					if (order.state.id !== 2) {
						return (
							<div key={order.id}>
								<p>{order.id}</p>
								<p>{new Date(order.createdAt).getDate()}</p>
								<p>{order.totalAmount} $</p>
								<button onClick={() => orderDone(order)}>Click here</button>
								<Timer date={order.createdAt} />
							</div>
						)
					}
				})}
			</div>
		</Main>
	)
}

export default KitchenHomepage
