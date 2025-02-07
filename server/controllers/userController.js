import ApiError from '../error/ApiError.js'

class UserController {
	async registration(req, res) {}

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
