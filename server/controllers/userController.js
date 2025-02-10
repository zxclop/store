import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'
import { Basket, User } from '../models/models.js'

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Incorrect email or password'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(ApiError.badRequest('User with this email already exists'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, paswword: hashPassword })
		const basket = await Basket.create({ userId: user.id })
		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.SECRET_KEY,
			{ expiresIn: '24h' }
		)
		return res.json({ token })
	}

	async login(req, res) {}

	async check(req, res, next) {
		const { id } = req.query
		if (!id) {
			// Если id не передан, то возвращаем ошибку
			return next(ApiError.badRequest('Не задан ID'))
		}
		res.json(id)
	}
}

export default new UserController() // ← Экспортируем экземпляр класса
