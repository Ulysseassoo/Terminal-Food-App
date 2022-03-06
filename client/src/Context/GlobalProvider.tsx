import React from "react"
import { UserProvider } from "./UserProvider"
import { OrdersProvider } from "./OrdersProvider"
import { ProductsProvider } from "./ProductsProvider"
import { CartProvider } from "./CartProvider"
import { IngredientsProvider } from "./IngredientsProvider"
import { CategoriesProvider } from "./CategoryProvider"
import { TerminalProvider } from "./TerminalProvider"
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
								<TerminalProvider>
									<OrdersProvider>{children}</OrdersProvider>
								</TerminalProvider>
							</CategoriesProvider>
						</IngredientsProvider>
					</UserProvider>
				</CartProvider>
			</ProductsProvider>
		</>
	)
}

export default GlobalProvider
