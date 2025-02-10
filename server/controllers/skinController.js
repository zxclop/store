import path from 'path'
import { fileURLToPath } from 'url'
import * as UUID from 'uuid'
import ApiError from '../error/ApiError.js'
import { Skin, SkinInfo } from '../models/models.js'

// Определяем __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class SkinController {
	async create(req, res, next) {
		try {
			let { name, price, heroId, rarityId, typeId, info } = req.body
			const { img } = req.files
			let fileName = UUID.v4() + '.jpg'

			// Теперь __dirname работает правильно
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			if (info) {
				info = JSON.parse(info)
				info.forEach(i => {
					SkinInfo.creatr({
						title: i.title,
						description: i.description,
						deviceId: i.deviceId,
					})
				})
			}
			const skin = await Skin.create({
				name,
				price,
				heroId,
				rarityId,
				typeId,
				info,
				img: fileName,
			})
			return res.json(skin)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		try {
			let { heroId, typeId, rarityId, limit = 10, page = 1 } = req.query
			let offset = (page - 1) * limit

			// Создаём пустой объект для фильтров
			let where = {}

			// Добавляем только те фильтры, которые есть в запросе
			if (heroId) where.heroId = heroId
			if (typeId) where.typeId = typeId
			if (rarityId) where.rarityId = rarityId

			// Выполняем запрос с динамическими фильтрами
			const skins = await Skin.findAndCountAll({ where, limit, offset })

			return res.json(skins)
		} catch (e) {
			return res.status(500).json({ message: 'Ошибка сервера' })
		}
	}

	async getOne(req, res) {
		const { id } = req.params
		const skin = await Skin.findOne({
			where: { id },
			incude: [{ type: SkinInfo, as: 'info' }],
		})
		return res.json(skin)
	}
}

export default new SkinController()
