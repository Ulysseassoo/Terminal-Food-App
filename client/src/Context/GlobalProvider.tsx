import React from "react"
import { UserProvider } from "./UserProvider"
import { OrdersProvider } from "./OrdersProvider"
import { ProductsProvider } from "./ProductsProvider"
import { CartProvider } from "./CartProvider"
interface Props {
	children: JSX.Element
}
const GlobalProvider = ({ children }: Props) => {
	return (
		<>
			<ProductsProvider>
				<CartProvider>
					<UserProvider>
						<OrdersProvider>{children}</OrdersProvider>
					</UserProvider>
				</CartProvider>
			</ProductsProvider>
		</>
	)
}

export default GlobalProvider
