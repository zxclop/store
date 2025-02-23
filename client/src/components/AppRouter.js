import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../router'
import { SHOP_ROUTE } from '../utils/const.js' // исправили путь

const AppRouter = () => {
	const isAuth = true
	return (
		<Routes>
			{' '}
			{/* Заменили Switch на Routes */}
			{isAuth &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />{' '}
		</Routes>
	)
}

export default AppRouter
