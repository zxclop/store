import path from 'path'
import { Op } from 'sequelize'
import { fileURLToPath } from 'url'
import * as UUID from 'uuid'
import ApiError from '../error/ApiError.js'
import { Skin, SkinInfo } from '../models/models.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class SkinController {
	async create(req, res, next) {
		try {
			let { name, price, heroId, rarityId, typeId, treasureId, info } = req.body
			if (!req.files || !req.files.img) {
				return next(ApiError.badRequest('File not found'))
			}			
			const { img } = req.files
			let fileName = UUID.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
	
			const skin = await Skin.create({
				name,
				price,
				heroId,
				rarityId,
				typeId,
				treasureId,
				img: fileName,
			})
	
			if (info) {
				info = JSON.parse(info)
				info.forEach(i => {
					SkinInfo.create({
						name: i.title,
						description: i.description,
						skinId: skin.id,
					})
				})
			}
	
			
			return res.json(skin)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
	

	async getAll(req, res) {
		try {
			let { heroId, typeId, rarityId, treasureId, limit = 10, page = 1 } = req.query
			let offset = (page - 1) * limit

			let where = {}

			if (heroId) where.heroId = heroId
			if (typeId) where.typeId = typeId
			if (rarityId) where.rarityId = rarityId
			if (treasureId) where.treasureId = treasureId
			let { name } = req.query
			if (name) where.name = {[Op.iLike]: `%${name}%`}
			const skins = await Skin.findAndCountAll({ where, limit, offset })

			return res.json(skins)
		} catch (e) {
			return res.status(500).json({ message: 'Server Error' })
		}
	}

	async getOne(req, res) {
		const { id } = req.params
		const skin = await Skin.findOne({
			where: { id },
			incude: [{ model: SkinInfo, as: 'info' }],
		})
		return res.json(skin)
	}
}

export default new SkinController()
