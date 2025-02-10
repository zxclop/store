import { Rarity } from '../models/models.js'

class RarityController {
	async create(req, res) {
		const { name } = req.body
		const rarity = await Rarity.create({ name })
		return res.json(rarity)
	}
	async getAll(req, res) {
		const heroes = await Rarity.findAll()
		return res.json(heroes)
	}
}
export default new RarityController()
