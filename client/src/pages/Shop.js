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
	fetchTypes,
} from '../http/skinAPI'
import { Context } from '../index'

const Shop = observer(() => {
	const { skin } = useContext(Context)

	useEffect(() => {
		fetchTypes().then(data => skin.setTypes(data))
		fetchHeroes().then(data => skin.setHeroes(data))
		fetchRarities().then(data => skin.setRarities(data))
		fetchTreasures().then(data => skin.setTreasures(data))
		fetchSkins(null, null, null, 1, 5).then(data => {
			skin.setSkins(data.rows)
			skin.setTotalCount(data.count)
		})
	}, [skin]) 

	useEffect(() => {
		fetchSkins(
			skin.selectedType?.id,
			skin.selectedHero?.id,
			skin.selectedRarity?.id,
			skin.selectedTreasure?.id,
			skin.page,
			15,
			skin.searchQuery
		).then(data => {
			skin.setSkins(data.rows)
			skin.setTotalCount(data.count)
		})
	}, [skin, skin.page, skin.selectedType?.id, skin.selectedHero?.id, skin.selectedRarity?.id, skin.selectedTreasure?.id, skin.searchQuery])
	
	
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
