import { createContext, useEffect } from "react";
import { useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import { api } from "../services/api";
import { recoverUserInformation } from "../services/Auth";

export type UserType = {
	userID: number,
	user: string,
	email: string,
  areaID: number,
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
			recoverUserInformation({ token }).then(response => setUser(response.user))

			//refresh cookies
			setCookie(undefined, 'corollas.token', token, {
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