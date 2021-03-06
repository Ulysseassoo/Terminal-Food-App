import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
import GlobalProvider from "./Context/GlobalProvider"
import { socket } from "./Services/socket"

const App = (): JSX.Element => {
	return (
		<ThemeProvider theme={globalTheme}>
			<ToastContainer />
			<GlobalStyles />
			<GlobalProvider>
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
							path="/admin/*"
							element={
								<PrivateRoute>
									<AdminHomepage />
								</PrivateRoute>
							}
						/>
					</Routes>
				</AnimatePresence>
			</GlobalProvider>
		</ThemeProvider>
	)
}

export default App
