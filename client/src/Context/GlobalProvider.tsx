import React from "react"
import { UserProvider } from "./UserProvider"
import { OrdersProvider } from "./OrdersProvider"
import { ProductsProvider } from "./ProductsProvider"
import { CartProvider } from "./CartProvider"
import { IngredientsProvider } from "./IngredientsProvider"
interface Props {
	children: JSX.Element
}
const GlobalProvider = ({ children }: Props) => {
	return (
		<>
			<ProductsProvider>
				<CartProvider>
					<UserProvider>
						<IngredientsProvider>
							<OrdersProvider>{children}</OrdersProvider>
						</IngredientsProvider>
					</UserProvider>
				</CartProvider>
			</ProductsProvider>
		</>
	)
}

export default GlobalProvider
