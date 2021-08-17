import { createContext } from "react";
import { setCookie } from 'nookies'
import { useState } from "react";
import Router from 'next/router'

import { signInRequest } from "../services/Auth";

type User = {
	name: string,
  email: string,
  areaID: number
}

type AuthContextType = {
	isAuthenticated: boolean,
	user: User
	signIn: (data: SignInData) => Promise<void>
}

export type SignInData = {
	token: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null)

	const isAuthenticated = !!user

	async function signIn({ token }: SignInData) {
		const { status, user } = await signInRequest({ 
			token 
		})

		//se a função signInRequest retornar status 200 continuar, senão retornar erro

		setCookie(undefined, 'corollas.token', token, {
			maxAge: 60 * 60 * 1, // 1 hour
		})

		setUser(user)

		Router.push('/dashboard')
	}

  return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}