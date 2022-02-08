import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ProductsProvider } from "./Context/ProductsProvider"
import { CartProvider } from "./Context/CartProvider"
import OrderSuccess from "./Screens/OrderSuccess"
import Homepage from "./Screens/Homepage"
import Accounts from "./Screens/Accounts"
import Auth from "./Screens/Auth"
import Shop from "./Screens/Shop"
import { GlobalStyles } from "./globalStyles"
import { globalTheme } from "./Theme/globalTheme"
import PrivateRoute from "./Components/PrivateRoute"
import KitchenHomepage from "./Components/Kitchen/KitchenHomepage"
import AdminHomepage from "./Components/Admin/AdminHomepage"
import { UserProvider } from "./Context/UserProvider"
import { OrdersProvider } from "./Context/OrdersProvider"

const App = (): JSX.Element => {
	return (
		<ThemeProvider theme={globalTheme}>
			<ToastContainer />
			<GlobalStyles />
			<ProductsProvider>
				<CartProvider>
					<UserProvider>
						<OrdersProvider>
							<AnimatePresence exitBeforeEnter initial={false}>
								<Routes location={location} key={location.pathname}>
									<Route path="/" element={<Homepage />} />
									<Route path="/accounts" element={<Accounts />} />
									<Route path="/user" element={<Auth user />} />
									<Route path="/kitchen" element={<Auth />} />
									<Route path="/admin" element={<Auth admin />} />
									<Route path="/menu" element={<Shop />} />
									<Route path="/checkout" element={<OrderSuccess />} />
									<Route path="/menu/:product/:id" element={<Shop />} />
									<Route
										path="/kitchen/homepage"
										element={
											<PrivateRoute $kitchen>
												<KitchenHomepage />
											</PrivateRoute>
										}
									/>
									<Route
										path="/admin/dashboard"
										element={
											<PrivateRoute>
												<AdminHomepage />
											</PrivateRoute>
										}
									/>
								</Routes>
							</AnimatePresence>
						</OrdersProvider>
					</UserProvider>
				</CartProvider>
			</ProductsProvider>
		</ThemeProvider>
	)
}

export default App
