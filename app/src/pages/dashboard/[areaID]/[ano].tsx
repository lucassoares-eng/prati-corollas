import { GetStaticPaths, InferGetServerSidePropsType } from 'next';
import Layout, { optionType } from '../../../components/Layout';
import { useRouter } from 'next/router'

export default function Dashboard({nivel, anos, diretorias, gerencias}: InferGetServerSidePropsType<typeof getStaticProps>) {
	const router = useRouter()
	const { areaID, ano } = router.query
	return(
		<Layout title='Dashboard' nivel={ nivel } anos={ anos } diretoriaFilter={ true } diretorias={ diretorias } gerenciaFilter={ true } gerencias={ gerencias }>
			<h2>areaID: { areaID }</h2>
			<h2>ano: { ano }</h2>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
    paths: [
			{ params: { areaID: '1', ano: '2020' } },
			{ params: { areaID: '1', ano: '2021' } },
			{ params: { areaID: '2', ano: '2020' } },
			{ params: { areaID: '2', ano: '2021' } },
			{ params: { areaID: '3', ano: '2020' } },
			{ params: { areaID: '3', ano: '2021' } },
			{ params: { areaID: '4', ano: '2020' } },
			{ params: { areaID: '4', ano: '2021' } },
			{ params: { areaID: '5', ano: '2020' } },
			{ params: { areaID: '5', ano: '2021' } }
		],
    fallback: true
  }
}

export const getStaticProps = async () => {
	const nivel : string = 'diretoria'

	const anos : optionType[] = [
		{ID:2021, name:'2021'},
		{ID:2020, name:'2020'}
	]

	const diretorias : optionType[] = [
		{ID: 1, name:'todos'},
		{ID: 2, name:'PD&I'},
		{ID: 3, name:'Engenharia'},
	]

	const gerencias : optionType[] = [
		{ID: 1, name:'todos'},
		{ID: 4, name: 'Farmacotécnico', superior: 2},
		{ID: 5, name: 'Manutenção Interna', superior: 3}
	]

	return {
		props:{
			nivel,
			anos,
			diretorias,
			gerencias
		}
	}
}