import { Terminal } from "../Models/Terminal"

export interface TerminalConnected {
	terminal: Terminal
	socket_id: string
}
