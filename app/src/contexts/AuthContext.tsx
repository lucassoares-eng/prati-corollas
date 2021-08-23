import { createContext, useEffect } from "react";
import { useState } from "react";
import { parseCookies, setCookie } from 'nookies'

export type UserType = {
	userID: number,
  areaID: number
}

type AuthContextType = {
	isAuthenticated: boolean,
	user: UserType
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
	const [user, setUser] = useState<UserType | null>(null)

	const isAuthenticated = !!user

	useEffect(() => {
		const { 'corollas.token': token } = parseCookies()

		if (token) {
			const { 'corollas.userID': userID } = parseCookies()
			const { 'corollas.areaID': areaID } = parseCookies()
			const user = {
				userID: parseInt(userID),
				areaID: parseInt(areaID)
			}
			setUser(user)

			//refresh cookies
			setCookie(undefined, 'corollas.token', token, {
				maxAge: 60 * 60 * 1, // 1 hour
				path: '/'
			})
			setCookie(undefined, 'corollas.userID', userID, {
				maxAge: 60 * 60 * 1, // 1 hour
				path: '/'
			})
			setCookie(undefined, 'corollas.areaID', areaID, {
				maxAge: 60 * 60 * 1, // 1 hour
				path: '/'
			})
		}
	}, [])
 
  return (
		<AuthContext.Provider value={{ user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}