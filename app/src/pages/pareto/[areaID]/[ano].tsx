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

	const paths = data.map(el => ({
    params: { areaID: el.areaID, ano: el.ano },
  }))

	return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
	const anos : optionType[] = [
		{ID:2021, name:'2021'},
		{ID:2020, name:'2020'}
	]

	const areas = await fetch(`${process.env.URL_API_CC}corollas-areas?areaID=${params.areaID}`)
	const data = await areas.json()
  const { diretorias, gerencias }: areasType = data

	return {
		props:{
			anos,
			diretorias,
			gerencias
		}
	}
}