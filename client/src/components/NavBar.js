import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../index.js'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/const.js'
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaUserShield } from 'react-icons/fa'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser()
		user.setIsAuth(false)
	}

	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<NavLink style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={SHOP_ROUTE}>
					Магазин
				</NavLink>

				<Nav className='ml-auto d-flex align-items-center' style={{ gap: '5px' }}>
					{user.isAuth ? (
						<>
							<Button
								variant='outline-light'
								// disabled={!user.isAdmin}
								onClick={() => navigate(ADMIN_ROUTE)}
								title="Адмінка"
							>
								<FaUserShield />
							</Button>

							<Button
								variant='outline-light'
								onClick={() => navigate(BASKET_ROUTE)}
								title="Корзина"
							>
								<FaShoppingCart />
							</Button>

							<Button
								variant='outline-light'
								onClick={logOut}
								title="Вийти"
							>
								<FaSignOutAlt />
							</Button>
						</>
					) : (
						<Button
							variant='outline-light'
							onClick={() => navigate(LOGIN_ROUTE)}
							title="Авторизація"
						>
							<FaSignInAlt />
						</Button>
					)}
				</Nav>
			</Container>
		</Navbar>
	)
})

export default NavBar
