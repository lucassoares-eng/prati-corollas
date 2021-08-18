import { useContext } from "react"
import { AuthContext } from '../contexts/AuthContext';


export default function Dashboard() {
	const { user } = useContext(AuthContext)

	return(
		<div>
			<h1>Dashboard</h1>
		</div>
	)
}