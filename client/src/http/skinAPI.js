import { $authHost, $host } from './index'

export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}
export const fetchTypes = async () => {
	const { data } = await $host.get('/api/type')
	return data
}

export const createHero = async hero => {
	const { data } = await $authHost.post('api/hero', hero)
	return data
}
export const fetchHeroes = async () => {
	const { data } = await $host.get('api/hero', 	)
	return data
}
export const createRarity = async rarity => {
	const { data } = await $authHost.post('api/rarity', rarity)
	return data
}
export const fetchRarities = async () => {
	const { data } = await $host.get('api/rarity')
	return data
}
export const createTreasure = async treasure => {
	const { data } = await $authHost.post('api/treasure', treasure)
	return data
}
export const fetchTreasures = async () => {
	const { data } = await $host.get('api/treasure')
	return data
}
export const createSkin = async skins => {
	const { data } = await $authHost.post('api/skin', skins)
	return data
}
export const fetchSkins = async (
  typeId,
  heroId,
  rarityId,
  treasureId,
  page,
  limit = 5,
  name
) => {
  const rawParams = { typeId, heroId, rarityId, treasureId, page, limit, name }

  const safeParams = Object.fromEntries(
    Object.entries(rawParams).filter(([_, v]) =>
      typeof v !== 'symbol' && v !== undefined && v !== null && v !== ''
    )
  )

  const { data } = await $host.get('api/skin', { params: safeParams })
  return data
}


export const fetchOneSkin = async id => {
	const { data } = await $host.get('api/skin' + id)
	return data
}
