import { Mailer } from 'nodemailer-react'

import { generate } from '../utils/Token'
import { transporter } from '../utils/Mailer'
import EmailToken from '../components/EmailToken'

type Props = {
	email: string
	linkSended: boolean
	msg: string
}

export const SendLink = ({ email, linkSended = false, msg }: Props) => {

	if (!email) {
		return [linkSended, msg = 'email is required']
	}

	const token = generate(email)

	const emailsList = {
		pass: EmailToken,
	}

	const mailer = Mailer(transporter, emailsList)

	try { 
		mailer.send(
			'pass', {
				firstName: 'Usuário',
				lastName: 'Sobrenome',
				link: `${process.env.HOST}/api/auth/${token}`,
				subject: "Seu link para o Relatório de Corollas"
			},
			{
				to: email,
				attachments: [],
			}
		)
		return [linkSended = true, msg = 'link has been sent']
	} catch {
		return [linkSended, msg = 'cannot send link']
	}
}