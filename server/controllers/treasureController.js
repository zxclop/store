import { Treasure } from '../models/models.js'

class TreasureController {
	async create(req, res) {
		const { name } = req.body
		const type = await Treasure.create({ name })
		return res.json(type)
	}
	async getAll(req, res) {
		const types = await Treasure.findAll()
		return res.json(types)
	}
}
export default new TreasureController()
