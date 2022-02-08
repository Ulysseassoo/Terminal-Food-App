import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getProducts } from "../Services/APIs"

type UserContextType = {
	userLoading: boolean
	user: User
	setUser: React.Dispatch<React.SetStateAction<User>>
}

const initialState = {
	userLoading: false,
	user: {
		email: "",
		role: ""
	},
	setUser: () => {}
}

export const UserContext = createContext<UserContextType>(initialState)

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User>(initialState.user)
	const [userLoading, setUserLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		console.log(user)
	}, [])

	return <UserContext.Provider value={{ setUser, user, userLoading }}>{children}</UserContext.Provider>
}
