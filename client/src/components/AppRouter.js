import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Context } from '../index.js'
import { authRoutes, publicRoutes } from '../router'
import { SHOP_ROUTE } from '../utils/const.js'

const AppRouter = observer(() => {
	const { user } = useContext(Context)

	return (
		<Routes>
			{' '}
			{}
			{user.isAuth &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />{' '}
		</Routes>
	)
})

export default AppRouter
