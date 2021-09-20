import { GetStaticPaths, InferGetServerSidePropsType } from 'next';
import Layout, { optionType } from '../../../components/Layout';
import { useRouter } from 'next/router'
import { areasType } from '../../dashboard/[areaID]/[ano]';

export default function Dashboard({anos, diretorias, gerencias}: InferGetServerSidePropsType<typeof getStaticProps>) {
	const router = useRouter()
	const { areaID, ano } = router.query
	return(
		<Layout title='Pareto' anos={ anos } diretorias={ diretorias } gerencias={ gerencias }>
			<h2>areaID: { areaID }</h2>
			<h2>ano: { ano }</h2>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch(`${process.env.URL_API_CC}corollas-paths`)
	const data = await res.json()

	const paths = data.map((el: { areaID: string; ano: string; }) => ({
    params: { areaID: el.areaID, ano: el.ano },
  }))

	return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
	const res_anos = await fetch(`${process.env.URL_API_CC}corollas-anos`)
	const anos = await res_anos.json()

	const res_areas = await fetch(`${process.env.URL_API_CC}corollas-areas?areaID=${params.areaID}&ano=${params.ano}`)
	const areas = await res_areas.json()
  const { diretorias, gerencias }: areasType = areas

	return {
		props:{
			anos,
			diretorias,
			gerencias
		}
	}
}