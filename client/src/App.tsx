import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./Screens/Homepage"
import { GlobalStyles } from "./globalStyles"
import { globalTheme } from "./Theme/globalTheme"
import { ThemeProvider } from "styled-components"

const App = (): JSX.Element => {
	return (
		<ThemeProvider theme={globalTheme}>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
