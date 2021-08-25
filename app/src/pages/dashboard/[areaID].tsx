import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';

export default function Dashboard() {
	return(
		<Layout title='Dashboard'>
			
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
    paths: [
			{ params: { areaID: '1' } }
		],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async () => {
	return {
		props:{}
	}
}