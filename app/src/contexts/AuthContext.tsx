import { createContext } from "react";
import { setCookie } from 'nookies'
import { useState } from "react";
import Router from 'next/router'

import { signInRequest } from "../services/Auth";

type AuthContextType = {
	isAuthenticated: boolean,
}

type SignInData = {
	token: string
}

type User = {
	name: string,
  email: string,
  areaID: number
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null)

	const isAuthenticated = false

	async function signIn({ token }: SignInData) {
		const { status, user } = await signInRequest({ 
			token 
		})

		setCookie(undefined, 'corollas.token', token, {
			maxAge: 60 * 60 * 1, // 1 hour
		})

		setUser(user)

		Router.push('/dashboard')
	}

  return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}