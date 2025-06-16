import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/useAPI'
import { Context } from '../index'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate() 
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			if (isLogin) {
				user.setUser(await login(email, password))
			} else {
				user.setUser(await registration(email, password))
			}
			user.setIsAuth(true)
			navigate(SHOP_ROUTE) 
		} catch (e) {
			alert(e.response?.data?.message || 'Помилка при авторизації')
		}
	}
	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш email...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш пароль...'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					{/* Container with text and button */}
					<Row className='d-flex justify-content-between align-items-center mt-3 px-3'>
						<Col xs='auto'>
							{isLogin ? (
								<div>
									Немає акаунта?{' '}
									<NavLink to={REGISTRATION_ROUTE} className='custom-link'>
										Зареєструйся!
									</NavLink>
								</div>
							) : (
								<div>
									Є аккаунт?{' '}
									<NavLink to={LOGIN_ROUTE} className='custom-link'>
										Увійдіть!
									</NavLink>
								</div>
							)}
						</Col>
						<Col xs='auto'>
							<Button variant='outline-success' onClick={click}>
								{isLogin ? 'Увійти' : 'Зареєструватися'}
							</Button>
						</Col>
					</Row>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
