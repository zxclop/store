import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'; // ⬅ useNavigate вместо useHistory
import { Context } from '../index.js'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const.js'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate() // ⬅ Заменили useHistory на useNavigate

	const logOut = () => {
		user.setUser()
		user.setIsAuth(false)
	}

	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
					shop
				</NavLink>
				{user.isAuth ? (
					<Nav className='ml-auto' style={{ color: 'white' }}>
						<Button
							variant='outline-light'
							onClick={() =>
								 navigate(ADMIN_ROUTE)
							}
						>
							Admin panel
						</Button>
						<Button
							variant='outline-light'
							onClick={() => logOut()}
							className='ml-2'
						>
							logout
						</Button>
					</Nav>
				) : (
					<Nav className='ml-auto' style={{ color: 'white' }}>
						<Button
							variant={'outline-light'}
							onClick={() => navigate(LOGIN_ROUTE)}
						>
							Authorization
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
