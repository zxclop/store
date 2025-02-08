import { Hero } from '../models/models.js'

class HeroController {
	async create(req, res) {
		const { name } = req.body
		const hero = await Hero.create({ name })
		return res.json(hero)
	}
	async getAll(req, res) {
		const heroes = await Hero.findAll()
		return res.json(heroes)
	}
}
export default new HeroController()
