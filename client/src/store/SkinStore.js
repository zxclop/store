import { makeAutoObservable } from 'mobx'

export default class SkinStore {
    constructor() {
        this._types = []
        this._rarities = []
        this._treasures = []
        this._menus = []
        this._heroes = []
        this._skins = []

        this._selectedType = {}
        this._selectedHero = {}
        this._selectedRarity = {}
        this._selectedTreasure = {}
        this._selectedMenu = {}
        this._selectedSkin = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 5
        this._searchQuery = ''

        makeAutoObservable(this, {}, { autoBind: true })
    }

    setTypes(types) { this._types = types }
    setRarities(rarities) { this._rarities = rarities }
    setMenus(menus) { this._menus = menus }
    setHeroes(heroes) { this._heroes = heroes }
    setTreasures(treasures) { this._treasures = treasures }
    setSkins(skins) { this._skins = skins }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedHero(hero) {
        this.setPage(1)
        this._selectedHero = hero
    }
    setSelectedRarity(rarity) {
        this.setPage(1)
        this._selectedRarity = rarity
    }
    setSelectedTreasure(treasure) {
        this.setPage(1)
        this._selectedTreasure = treasure
    }

    setPage(page) { this._page = page }
    setTotalCount(count) { this._totalCount = count }
    setSearchQuery(query) { this._searchQuery = query }

    resetFilters() {
        this.setSelectedType({})
        this.setSelectedHero({})
        this.setSelectedRarity({})
        this.setSelectedTreasure({})
        this.setSearchQuery('')
        this.setPage(1)
    }

    get types() { return this._types }
    get rarities() { return this._rarities }
    get menus() { return this._menus }
    get heroes() { return this._heroes }
    get treasures() { return this._treasures }
    get skins() { return this._skins }

    get selectedType() { return this._selectedType }
    get selectedHero() { return this._selectedHero }
    get selectedRarity() { return this._selectedRarity }
    get selectedTreasure() { return this._selectedTreasure }
    get selectedMenu() { return this._selectedMenu }
    get selectedSkin() { return this._selectedSkin }

    get page() { return this._page }
    get totalCount() { return this._totalCount }
    get limit() { return this._limit }
    get searchQuery() { return this._searchQuery }

get selectedHeroId() {
  return this._selectedHero?.id || null
}
get selectedTypeId() {
  return this._selectedType?.id || null
}
get selectedRarityId() {
  return this._selectedRarity?.id || null
}
get selectedTreasureId() {
  return this._selectedTreasure?.id || null
}
}
