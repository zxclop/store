import { Skin, Hero, Rarity, Type, Treasure, SkinInfo } from '../models/models.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class SkinController {
  async create(req, res) {
    try {
      const { name, price, heroId, rarityId, typeId, treasureId, info } = req.body
      const { img } = req.files

      const fileName = uuidv4() + '.jpg'
      const filePath = path.resolve(__dirname, '..', 'static', fileName)
      await img.mv(filePath)

      const skin = await Skin.create({ name, price, heroId, rarityId, typeId, treasureId, img: fileName })

      if (info) {
        const parsedInfo = JSON.parse(info)
        for (const i of parsedInfo) {
          await SkinInfo.create({
            title: i.title,
            description: i.description,
            skinId: skin.id,
          })
        }
      }

      return res.json(skin)
    } catch (e) {
      console.error('❌ Error in create:', e)
      return res.status(500).json({ message: 'Помилка при створенні скіна.' })
    }
  }

async update(req, res) {
  try {
    const skinId = req.params.id
    const { name, price, heroId, rarityId, typeId, treasureId, info } = req.body

    const skin = await Skin.findByPk(skinId)
    if (!skin) {
      return res.status(404).json({ message: 'Скін не знайдено' })
    }

    const updatedFields = {}

    if (name !== undefined) updatedFields.name = name
    if (price !== undefined) updatedFields.price = price
    if (heroId !== undefined) updatedFields.heroId = heroId
    if (rarityId !== undefined) updatedFields.rarityId = rarityId
    if (typeId !== undefined) updatedFields.typeId = typeId
    if (treasureId !== undefined) updatedFields.treasureId = treasureId


    if (req.files && req.files.img) {
      const img = req.files.img
      const fileName = uuidv4() + '.jpg'
      const filePath = path.resolve(__dirname, '..', 'static', fileName)
      await img.mv(filePath)

      const oldPath = path.resolve(__dirname, '..', 'static', skin.img)
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath)
      }

      updatedFields.img = fileName
    }
console.log(" body:", req.body)
console.log(" files:", req.files)

console.log(" updatedFields:", updatedFields)

    await skin.update(updatedFields)

    if (info) {
      try {
        await SkinInfo.destroy({ where: { skinId: skin.id } })
        const parsedInfo = JSON.parse(info)

        for (const i of parsedInfo) {
          await SkinInfo.create({
            title: i.title,
            description: i.description,
            skinId: skin.id,
          })
        }
      } catch (parseError) {
        console.error('❌ Невалідне info:', info)
        return res.status(400).json({ message: 'Некоректний формат поля info' })
      }
    }

    return res.json(skin)
  } catch (e) {
    console.error('❌ Error in update:', e)
    return res.status(500).json({ message: 'Помилка при оновленні скіна.' })
  }
}


  async getAll(req, res) {
  try {
    const {
      typeId,
      heroId,
      rarityId,
      treasureId,
      page = 1,
      limit = 5,
      search = ''
    } = req.query

    const where = {}

    if (typeId) where.typeId = Number(typeId)
    if (heroId) where.heroId = Number(heroId)
    if (rarityId) where.rarityId = Number(rarityId)
    if (treasureId) where.treasureId = Number(treasureId)
    if (search) where.name = { $like: `%${search}%` }

    const offset = (page - 1) * limit

    const skins = await Skin.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
      include: [Hero, Rarity, Type, Treasure]
    })

    return res.json(skins)
  } catch (e) {
    console.error('Error in getAll:', e)
    return res.status(500).json({ message: 'Помилка при отриманні скінів.' })
  }
}

  async getOne(req, res) {
    try {
      const { id } = req.params
      const skin = await Skin.findOne({
        where: { id },
        include: [{ model: SkinInfo, as: 'info' }, Hero, Rarity, Type, Treasure],
      })
      if (!skin) return res.status(404).json({ message: 'Скін не знайдено' })
      return res.json(skin)
    } catch (e) {
      return res.status(500).json({ message: 'Помилка при отриманні скіна.' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const skin = await Skin.findByPk(id)
      if (!skin) return res.status(404).json({ message: 'Скін не знайдено' })

      const imgPath = path.resolve(__dirname, '..', 'static', skin.img)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      }

      await SkinInfo.destroy({ where: { skinId: id } })
      await skin.destroy()

      return res.json({ message: 'Скін видалено' })
    } catch (e) {
      return res.status(500).json({ message: 'Помилка при видаленні скіна.' })
    }
  }
}

export default new SkinController()
