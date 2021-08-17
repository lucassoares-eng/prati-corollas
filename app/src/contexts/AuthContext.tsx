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
		const { user } = await signInRequest({ token })

		setUser(user)

		Router.push('/dashboard')
	}

  return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}