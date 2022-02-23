import io from "socket.io-client"

const ENDPOINT = "localhost:3500"
export const socket = io(ENDPOINT)
