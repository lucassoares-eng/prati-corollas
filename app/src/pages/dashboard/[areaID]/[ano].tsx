import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router'

export default function Dashboard() {
	const router = useRouter()
	const { areaID, ano } = router.query
	return(
		<Layout title='Dashboard' diretoriaFilter={ true } gerenciaFilter={ true } >
			<h2>areaID: { areaID }</h2>
			<h2>ano: { ano }</h2>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
    paths: [
			{ params: { areaID: '1', ano: '2020' } },
			{ params: { areaID: '1', ano: '2021' } }
		],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async () => {
	return {
		props:{}
	}
}