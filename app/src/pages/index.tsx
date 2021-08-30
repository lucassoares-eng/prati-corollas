import { LockClosedIcon } from '@heroicons/react/solid'
import { MailOpenIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '../components/Alert';
import jwt from 'jsonwebtoken'

type HandleSingInType = {
	email: string
}

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [success, setSuccess] = useState(false)
  const [userFail, setUserFail] = useState(false)
  const [contactError, setContactError] = useState(false)

  const router = useRouter()
  const { expired, error } = router.query

  const [linkExpired, setLinkExpired] = useState(Boolean(expired))
  const [linkError, setLinkError] = useState(Boolean(error))

  async function handleSignIn({ email }: HandleSingInType) {
    setUserFail(false)
    setContactError(false)
    setLinkExpired(false)
    setLinkError(false)
    const res = await fetch(`/api/contact/${email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        setSuccess(true)
      } else if (res.status === 402) {
        setUserFail(true)
      } else {
        setContactError(true)
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full position: relative">
        <div className={`back ${success? 'invisible' : 'visible'}`}>
          <div>
            <div className="mx-auto h-auto w-auto flex items-center justify-center" >
              <Image src="/logo_prati_roxo.png" alt="logo" width="120" height="120" />
              <div className="h-70px w-0.5 bg-roxo_prati"></div>
              <div className="flex-column ml-1 text-roxo_prati font-bold text-left text-xl ">
                <h2 className="-mb-2">Perdas</h2>
                <h2 >em</h2>
                <h2 className="-mt-2">Corollas</h2>
              </div>
            </div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register('email')}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className={`front ${success? 'visible' : 'invisible'} position: absolute top-0 w-full h-full flex flex-col items-center justify-center`}>
          <div className= "animate-bounce">
          <MailOpenIcon className="h-14 w-14 text-roxo_prati" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">Confirm your e-mail</h2>
          <h3 className="mt-1 text-center text-xl text-gray-900">An email has been sent with a link</h3>
        </div>
      </div>
      <>
        {linkExpired? (
          <div className={`alert position: fixed top-4`}>
            <Alert showAlert = { setLinkExpired } color='red' msg='Seu link expirou, faça login novamente'></Alert>
          </div>
        ): null}
      </>
      <>
        {linkError? (
          <div className={`alert position: fixed top-4`}>
            <Alert showAlert = { setLinkError } color='red' msg='Link inválido, faça login novamente'></Alert>
          </div>
        ): null}
      </>
      <>
        {userFail? (
          <div className={`alert position: fixed top-4`}>
            <Alert showAlert = { setUserFail } color='red' msg='Usuário não cadastrado'></Alert>
          </div>
        ): null}
      </>
      <>
        {contactError? (
          <div className={`alert position: fixed top-4`}>
            <Alert showAlert = { setContactError } color='red' msg='Desculpe, serviço indisponível'></Alert>
          </div>
        ): null}
      </>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
	const { 'corollas.token': token } = parseCookies(ctx)

	if (token) {
    let decoded: string | jwt.JwtPayload
    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
      const { areaID } = (decoded as { areaID: string })
      return {
        redirect: {
          destination: `/dashboard/${areaID}/2021`,
          permanent: false
        }
      }
    } catch {}
	}

	return {
		props: {}
	}
}