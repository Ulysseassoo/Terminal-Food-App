import { createContext, useContext, useEffect, useState } from "react"
import { getOrders, getProducts } from "../Services/APIs"
import { UserContext } from "./UserProvider"

type OrdersContextType = {
	ordersLoading: boolean
	orders: Order[]
	getAllOrders: (token: string) => void
	updateOrders: (order: Order) => void
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>
	addNewOrder: (order: Order) => void
}

const initialState = {
	ordersLoading: true,
	orders: [],
	getAllOrders: (token: string) => [],
	setOrders: () => {},
	updateOrders: (order: Order) => {},
	addNewOrder: (order: Order) => {}
}

export const OrdersContext = createContext<OrdersContextType>(initialState)

export const OrdersProvider: React.FC = ({ children }) => {
	const [orders, setOrders] = useState<Order[]>([])
	const [ordersLoading, setOrdersLoading] = useState(true)
	const { user } = useContext(UserContext)

	const getAllOrders = async (token: string) => {
		try {
			let { data } = await getOrders(token)
			setOrders(data)
			setOrdersLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const updateOrders = (order: Order) => {
		const newOrders = [
			...orders.map((item) => {
				if (item.id === order.id) {
					return { ...item, ...order }
				}
				return item
			})
		]
		setOrders(newOrders)
	}

	const addNewOrder = (order: Order) => {
		const newOrders = [...orders, order]
		setOrders(newOrders)
	}

	useEffect(() => {
		if (user.role !== "user" && user.role !== "") {
			const token = localStorage.getItem("token")
			getAllOrders(token!)
		}
	}, [user])

	return (
		<OrdersContext.Provider value={{ orders, getAllOrders, setOrders, ordersLoading, updateOrders, addNewOrder }}>{children}</OrdersContext.Provider>
	)
}
