import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Context } from '.'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/useAPI'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then(data => {
				user.setUser(true) // Устанавливаем данные пользователя
				user.setIsAuth(true) // Устанавливаем авторизацию
			})
			.catch(error => {
				console.error(
					'Ошибка авторизации:',
					error.response?.data?.message || error.message
				)
			})
			.finally(() => setLoading(false))
	}, [user]) // Добавляем зависимость

	if (loading) {
		return <Spinner animation={'grow'} />
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})

export default App
