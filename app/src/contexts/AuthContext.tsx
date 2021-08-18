import { createContext, useEffect } from "react";
import { useState } from "react";
import { parseCookies } from 'nookies'

type User = {
	name: string,
  email: string,
  areaID: number
}

type AuthContextType = {
	isAuthenticated: boolean,
	user: User
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null)

	const isAuthenticated = !!user

	useEffect(() => {
		const { 'corollas.userID': token } = parseCookies()

		if (token) {
			console.log(token)
		}
	}, [])
 
  return (
		<AuthContext.Provider value={{ user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}