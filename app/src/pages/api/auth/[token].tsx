import { NextApiRequest, NextApiResponse  } from 'next'
import { useContext } from 'react'
import { AuthContext, SignInData } from '../../../contexts/AuthContext';

interface signInRequestInterface extends NextApiRequest {
	query: SignInData
}

export default async function signInRequest(req: signInRequestInterface, res: NextApiResponse) {
	//const { signIn } = useContext(AuthContext)
	const { query } = req
	console.log(query)
	//await signIn(query)
	return (<h1>Validando acesso</h1>)
}