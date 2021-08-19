import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';


export default function Dashboard() {
	const { user, isAuthenticated } = useContext(AuthContext)

	return(
		<div>
			<h1>Dashboard</h1>
			<p>userID: {user?.userID}</p>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
	const { 'corollas.token': token } = parseCookies(ctx)

	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}