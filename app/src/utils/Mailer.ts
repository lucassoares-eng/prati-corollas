import { SendMailOptions } from 'nodemailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
import { ReactElement } from 'react'

export type EmailConfig = {
  transport: TransportOptions,
  defaults?: SendMailOptions,
}

export type Email<Props> = (props: Props) => {
  body: ReactElement<Props>,
  subject: string,
}

export type EmailsList = {
  [name: string]: Email<any>,
}

export const transporter = {
  defaults: {
    from: {
      name: 'Lucas Soares',
      address: 'lucas.soares@pratidonaduzzi.com.br',
    },
  },
  transport: {
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  },
}