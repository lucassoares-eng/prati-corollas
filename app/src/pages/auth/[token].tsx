import { NextApiRequest, NextApiResponse } from 'next'
import { signInRequest } from "../../services/Auth";

interface signInInterface extends NextApiRequest {
	query: {
		token?: string
	}
}

async function signIn(req: signInInterface, res: NextApiResponse) {
  const { query } = req;
  
}