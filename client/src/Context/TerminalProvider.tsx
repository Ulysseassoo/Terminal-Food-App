import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { toast } from "react-toastify"
import { socket } from "../Services/socket"

type TerminalContextType = {
	terminalLoading: boolean
	terminal: Terminal
	setTerminal: React.Dispatch<React.SetStateAction<Terminal>>
	disconnectTerminal: () => void
}

const initialState = {
	terminalLoading: false,
	terminal: {
		id: 0,
		unique_id: ""
	},
	setTerminal: () => {},
	disconnectTerminal: () => {}
}

export const TerminalContext = createContext<TerminalContextType>(initialState)

export const TerminalProvider: React.FC = ({ children }) => {
	const [terminal, setTerminal] = useState<Terminal>(initialState.terminal)
	const [terminalLoading, setTerminalLoading] = useState(true)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/menu" && terminal.unique_id.length === 0) {
			socket.emit("get_terminal")
			socket.on("connect_terminal", (data) => {
				setTerminal(data.data)
				setTerminalLoading(false)
				toast.success("Connected successfully to a Terminal")
			})
		}
		return () => {
			socket.off("connect_terminal")
		}
	}, [location])

	const disconnectTerminal = () => {
		socket.emit("disconnect_terminal")
		setTerminal(initialState.terminal)
		setTerminalLoading(true)
		return
	}

	return <TerminalContext.Provider value={{ setTerminal, terminal, terminalLoading, disconnectTerminal }}>{children}</TerminalContext.Provider>
}
