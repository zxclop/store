import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Context } from '../index'

const SkinFilters = observer(() => {
	const { skin } = useContext(Context)
	const [search, setSearch] = useState('')
	
	const handleSearch = (e) => {
		e.preventDefault()
		skin.setSearchQuery(search)
		skin.setPage(1)
	}

	const handleResetFilters = () => {
		skin.setSelectedType({})
		skin.setSelectedHero({})
		skin.setSelectedRarity({})
		skin.setSelectedTreasure({})
		setSearch('')
		skin.setSearchQuery('')
		skin.setPage(1)
	}
	if (!skin || !skin.types || !skin.rarities || !skin.heroes 	) {
		return <div>Завантаження...</div>
	}

	return (
		<Form>
			<Form.Group controlId='typeSelect'>
				<Form.Label>Тип</Form.Label>
				<Form.Control
					as='select'
					value={skin.selectedType?.id || ''}
					onChange={e =>
						skin.setSelectedType(
							skin.types.find(t => t.id === Number(e.target.value)) || {}
						)
					}
				>
					<option value=''>All</option>
					{skin.types.map(type => (
						<option key={type.id} value={type.id}>
							{type.name}
						</option>
					))}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId='raritySelect' className='mt-2'>
				<Form.Label>Рідкість</Form.Label>
				<Form.Control
					as='select'
					value={skin.selectedRarity?.id || ''}
					onChange={e =>
						skin.setSelectedRarity(
							skin.rarities.find(r => r.id === Number(e.target.value)) || {}
						)
					}
				>
					<option value=''>All</option>
					{skin.rarities.map(rarity => (
						<option key={rarity.id} value={rarity.id}>
							{rarity.name}
						</option>
					))}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId='heroSelect' className='mt-2'>
				<Form.Label>Герої</Form.Label>
				<Form.Control
					as='select'
					value={skin.selectedHero?.id || ''}
					onChange={e =>
						skin.setSelectedHero(
							skin.heroes.find(h => h.id === Number(e.target.value)) || {}
						)
					}
				>
					<option value=''>All</option>
					{skin.heroes.map(hero => (
						<option key={hero.id} value={hero.id}>
							{hero.name}
						</option>
					))}
				</Form.Control>
			</Form.Group>
				<InputGroup className='mt-4'>
					<Form.Control
						placeholder="Шукати скіни за назвою"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>

				<Button type='sumbit' onClick={handleSearch} >
					Шукати
				</Button>
				 </InputGroup>
			<Button variant="outline-secondary"
				className='mt-3'
				onClick={handleResetFilters}>
				Скинути фільтри
			</Button>
		</Form>
	)
})

export default SkinFilters
