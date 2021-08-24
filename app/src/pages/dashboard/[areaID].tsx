import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';


export default function Dashboard() {

	return(
		<Layout title='Dashboard'>

		</Layout>
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