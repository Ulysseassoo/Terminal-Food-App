import { Route, Routes, useLocation } from "react-router-dom"
import Homepage from "./Screens/Homepage"
import { GlobalStyles } from "./globalStyles"
import { globalTheme } from "./Theme/globalTheme"
import { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import Accounts from "./Screens/Accounts"

const App = (): JSX.Element => {
	const location = useLocation()

	return (
		<ThemeProvider theme={globalTheme}>
			<GlobalStyles />
			<AnimatePresence exitBeforeEnter initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Homepage />} />
					<Route path="/accounts" element={<Accounts />} />
				</Routes>
			</AnimatePresence>
		</ThemeProvider>
	)
}

export default App
