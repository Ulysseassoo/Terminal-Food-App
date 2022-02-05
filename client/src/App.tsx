import { Route, Routes, useLocation } from "react-router-dom"
import Homepage from "./Screens/Homepage"
import { GlobalStyles } from "./globalStyles"
import { globalTheme } from "./Theme/globalTheme"
import { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import { ToastContainer } from "react-toastify"
import Accounts from "./Screens/Accounts"
import Auth from "./Screens/Auth"
import "react-toastify/dist/ReactToastify.css"
import Shop from "./Screens/Shop"
import Modal from "./Components/Shop/Modal"
import { ProductsProvider } from "./Context/ProductsProvider"

const App = (): JSX.Element => {
	const location = useLocation()

	return (
		<ThemeProvider theme={globalTheme}>
			<ToastContainer />
			<GlobalStyles />
			<ProductsProvider>
				<AnimatePresence exitBeforeEnter initial={false}>
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<Homepage />} />
						<Route path="/accounts" element={<Accounts />} />
						<Route path="/user" element={<Auth user />} />
						<Route path="/kitchen" element={<Auth />} />
						<Route path="/admin" element={<Auth admin />} />
						<Route path="/menu" element={<Shop />} />
						<Route path="/menu/:product/:id" element={<Shop />} />
					</Routes>
				</AnimatePresence>
			</ProductsProvider>
		</ThemeProvider>
	)
}

export default App
