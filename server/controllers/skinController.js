import path from 'path'
import UUID from 'uuid'
import ApiError from '../error/ApiError.js'
import { Skin } from '../models/models.js'
class SkinController {
	async create(req, res) {
		try {
			const { name, price, heroId, rarityId, typeId, info } = req.body
			const { img } = req.files
			let fileName = UUID.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

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
			return ApiError.badRequest(e.message)
		}
	}
	async getAll(req, res) {}
	async getOne(req, res) {}
}
export default new skinController()
