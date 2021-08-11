import React from 'react';
import EmailLayout from './EmailLayout';
import { Email } from '../utils/Mailer';

type Props = {
  firstName: string,
  lastName: string,
  link: string,
  subject: string,
}

const buttonStyle = {
  marginLeft: "30px",
  marginTop: "30px",
  padding: '15px',
}

const linkStyle = {
  color: '#ffffff',
  fontSize: "13pt",
  textDecoration: 'none'
}

const EmailToken: Email<Props> = ({ firstName, lastName, link, subject }) => ({
  subject: subject,
  body: (
    <EmailLayout title={`Olá ${firstName} ${lastName}!`}>
      <div>
        <h3>Clique no botão abaixo para acessar o Relatório de Corollas:</h3>
        <div style={buttonStyle}>
          <div style={{backgroundColor: '#4299e1', padding: '10px', width: '70px'}}>
            <a href={link} style={linkStyle}>
              <span style={{fontWeight: 'bolder'}}>Acessar</span>
            </a>
          </div>
        </div>
        <p style={{marginTop: "40px", marginBottom: "14px", color: '#6b6b6b'}}>Alternativamente você também pode copiar e colar o link abaixo no seu navegador:</p>
        <p style={{marginBottom: "14px", fontSize: '10pt'}}>{ link }</p>
      </div>
    </EmailLayout>
  ),
})

export default EmailToken