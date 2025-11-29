import { useState } from 'react'
import Layout from './components/layout/Layout'

function App() {
	const [count, setCount] = useState(0)

	return (
		<Layout>
			<div className='App'>
				<h1>Лучшее приложение для тренировок епта</h1>
				
			</div>
		</Layout>
	)
}

export default App
