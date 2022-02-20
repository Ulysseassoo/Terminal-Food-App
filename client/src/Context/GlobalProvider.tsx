import React from "react"
import { UserProvider } from "./UserProvider"
import { OrdersProvider } from "./OrdersProvider"
import { ProductsProvider } from "./ProductsProvider"
import { CartProvider } from "./CartProvider"
import { IngredientsProvider } from "./IngredientsProvider"
import { CategoriesProvider } from "./CategoryProvider"
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
							<CategoriesProvider>
								<OrdersProvider>{children}</OrdersProvider>
							</CategoriesProvider>
						</IngredientsProvider>
					</UserProvider>
				</CartProvider>
			</ProductsProvider>
		</>
	)
}

export default GlobalProvider
