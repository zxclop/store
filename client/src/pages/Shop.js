import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Pages from '../components/Pages'
import SkinFilters from '../components/SkinFilters'
import SkinList from '../components/SkinList'
import MenuBar from '../components/TreasureBar'
import {
  fetchHeroes,
  fetchRarities,
  fetchSkins,
  fetchTreasures,
  fetchTypes
} from '../http/skinAPI'
import { Context } from '../index'

const Shop = observer(() => {
  const { skin } = useContext(Context)

useEffect(() => {
  skin.setSelectedType({})
  skin.setSelectedHero({})
  skin.setSelectedRarity({})
  skin.setSelectedTreasure({})
  skin.setSearchQuery('')
  skin.setPage(1)

  fetchTypes().then(data => {
    skin.setTypes(data)
  })
  fetchHeroes().then(data => {
    skin.setHeroes(data)
  })
  fetchRarities().then(data => {
    skin.setRarities(data)
  })
  fetchTreasures().then(data => {
    skin.setTreasures(data)
  })
}, [skin])

useEffect(() => {
  const params = {
    typeId: skin.selectedTypeId,
    heroId: skin.selectedHeroId,
    rarityId: skin.selectedRarityId,
    treasureId: skin.selectedTreasureId,
    page: skin.page,
    limit: skin.limit,
    search: skin.searchQuery
  }


  fetchSkins(
    params.typeId,
    params.heroId,
    params.rarityId,
    params.treasureId,
    params.page,
    params.limit,
    params.search
  ).then(data => {
    if (Array.isArray(data)) {
      skin.setSkins(data)
      skin.setTotalCount(data.length)
    } else if (data?.rows) {
      skin.setSkins(data.rows)
      skin.setTotalCount(data.count || 0)
    } else {
      console.warn('⚠️ Неочікувана відповідь:', data)
      skin.setSkins([])
      skin.setTotalCount(0)
    }
  })
}, [
  skin.selectedTypeId,
  skin.selectedHeroId,
  skin.selectedRarityId,
  skin.selectedTreasureId,
  skin.page,
  skin.searchQuery
])


  return (
    <Container>
      <Row className='mt-5'>
        <Col md={3}>
          <MenuBar />
        </Col>
        <Col md={9}>
          <SkinFilters />
          <SkinList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
