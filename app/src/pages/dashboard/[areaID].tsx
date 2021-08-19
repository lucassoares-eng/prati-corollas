import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';


export default function Dashboard() {

	return(
		<div>
			<h1>Dashboard</h1>
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