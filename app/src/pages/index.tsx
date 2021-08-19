import { LockClosedIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

type HandleSingInType = {
	email: string
}

export default function Login() {
  const { register, handleSubmit } = useForm()

  async function handleSignIn({ email }: HandleSingInType) {
    const res = await fetch(`/api/contact/${email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log('redirect to success page')
      } else {
        console.log('show error')
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
	const { 'corollas.token': token } = parseCookies(ctx)

	if (token) {
    const { 'corollas.areaID': areaID } = parseCookies(ctx)
		return {
			redirect: {
				destination: `/dashboard/${areaID}`,
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}