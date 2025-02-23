import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import SkinPage from './pages/SkinPage'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
	SKIN_ROUTE,
} from './utils/const.js'

export const authRoutes = [
	{ path: ADMIN_ROUTE, Component: Admin },
	{ path: BASKET_ROUTE, Component: Basket },
]

export const publicRoutes = [
	{ path: SHOP_ROUTE, Component: Shop },
	{ path: LOGIN_ROUTE, Component: Auth },
	{ path: REGISTRATION_ROUTE, Component: Auth },
	{ path: SKIN_ROUTE + '/:id', Component: SkinPage },
]
