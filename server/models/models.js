import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketSkin = sequelize.define('basket_skin', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Skin = sequelize.define('skin', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	img: { type: DataTypes.STRING, allowNull: false },
})

const Rarity = sequelize.define('rarity', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Hero = sequelize.define('hero', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.STRING, allowNull: false },
})

const SkinInfo = sequelize.define('skin_info', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	treasureId: { type: DataTypes.INTEGER, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

const TypeHero = sequelize.define('type_hero', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const TypeRarity = sequelize.define('type_rarity', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const RarityHero = sequelize.define('rarity_hero', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketSkin)
BasketSkin.belongsTo(Basket)

Rarity.hasMany(Skin)
Skin.belongsToMany(Rarity, { through: 'SkinRarity' })
Hero.belongsToMany(Rarity, { through: RarityHero })

Hero.hasMany(Skin)
Skin.belongsTo(Hero)

Type.hasMany(Skin)
Skin.belongsTo(Type)

Skin.hasMany(BasketSkin)
BasketSkin.belongsTo(Skin)

Skin.hasMany(SkinInfo)
SkinInfo.belongsTo(Skin)

export {
	Basket,
	BasketSkin,
	Hero,
	Rarity,
	RarityHero,
	Rating,
	Skin,
	SkinInfo,
	Type,
	TypeHero,
	TypeRarity,
	User,
}
