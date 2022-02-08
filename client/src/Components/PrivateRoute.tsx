import React, { useContext } from "react"
import { UserContext } from "../Context/UserProvider"
import { Navigate, useLocation } from "react-router-dom"

interface Props {
	$kitchen?: boolean
	children: JSX.Element
}

const PrivateRoute = ({ $kitchen, children }: Props) => {
	const location = useLocation()
	const { user, userLoading } = useContext(UserContext)
	const ADMIN = "admin"
	const KITCHEN = "kitchen"

	// Check if there is a user
	if (user.email === "" || user.role === "") {
		return <Navigate to="/accounts" state={{ from: location }} />
	}

	if (userLoading) {
		return <>Checking auth..</>
	}

	// Check if user has required Role
	const userHasKitchenRole = user && user.role === KITCHEN ? true : false
	const userHasAdminRole = user && user.role === ADMIN ? true : false
	if ($kitchen) {
		if (!userHasKitchenRole) {
			return <p>Access Denied</p> // Show Error Page Not Authorized
		}
	} else {
		if (!userHasAdminRole) {
			return <p>Access Denied</p> // Show Error Page Not Authorized
		}
	}

	return children
}

export default PrivateRoute
