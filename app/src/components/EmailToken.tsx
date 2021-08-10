import * as React from 'react'
import EmailLayout from './EmailLayout';
import { Email } from '../utils/Mailer';

type Props = {
  firstName: string,
  lastName: string,
  newAccount: boolean,
  password: string,
  brand: string,
}

const EmailToken: Email<Props> = ({ firstName, lastName, password, newAccount, brand }) => ({
  subject: newAccount ? `Welcome to ${brand}!` : `Your new ${brand} password.`,
  body: (
    <EmailLayout title={`${firstName} ${lastName}`}>
      <div>
        <p>Your password is:</p>
        <p>{password}</p>
      </div>
    </EmailLayout>
  ),
})

export default EmailToken