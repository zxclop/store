import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Context } from '../index'

const SkinFilters = observer(() => {
    const { skin } = useContext(Context)
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        skin.setSearchQuery(search.trim())
        skin.setPage(1)
    }

	const handleResetFilters = () => {
		skin.setSelectedType({})
		skin.setSelectedHero({})
		skin.setSelectedRarity({})
		skin.setSelectedTreasure({})
		skin.setSearchQuery('')
		skin.setPage(1)
		setSearch('')
	}

    useEffect(() => {
        if (!skin.types.some(t => t.id === skin.selectedType?.id)) skin.setSelectedType({})
        if (!skin.heroes.some(h => h.id === skin.selectedHero?.id)) skin.setSelectedHero({})
        if (!skin.rarities.some(r => r.id === skin.selectedRarity?.id)) skin.setSelectedRarity({})
        if (!skin.treasures.some(t => t.id === skin.selectedTreasure?.id)) skin.setSelectedTreasure({})
    }, [
		skin,
        skin.types,
        skin.heroes,
        skin.rarities,
        skin.treasures
    ])

    if (
        !Array.isArray(skin.types) ||
        !Array.isArray(skin.rarities) ||
        !Array.isArray(skin.heroes) ||
        !Array.isArray(skin.treasures)
    ) {
        return <div>Завантаження фільтрів...</div>
    }

    return (
        <Form onSubmit={handleSearch}>
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
                    <option value=''>Усі</option>
                    {skin.types.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
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
                    <option value=''>Усі</option>
                    {skin.rarities.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='heroSelect' className='mt-2'>
                <Form.Label>Герой</Form.Label>
                <Form.Control
                    as='select'
                    value={skin.selectedHero?.id || ''}
                    onChange={e =>
                        skin.setSelectedHero(
                            skin.heroes.find(h => h.id === Number(e.target.value)) || {}
                        )
                    }
                >
                    <option value=''>Усі</option>
                    {skin.heroes.map(h => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='treasureSelect' className='mt-2'>
                <Form.Label>Трежер</Form.Label>
                <Form.Control
                    as='select'
                    value={skin.selectedTreasure?.id || ''}
                    onChange={e =>
                        skin.setSelectedTreasure(
                            skin.treasures.find(t => t.id === Number(e.target.value)) || {}
                        )
                    }
                >
                    <option value=''>Усі</option>
                    {skin.treasures.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <InputGroup className='mt-4'>
                <Form.Control
                    placeholder="Шукати скіни за назвою"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button type='submit'>Шукати</Button>
            </InputGroup>

            <Button
                variant="outline-secondary"
                className='mt-3'
                onClick={handleResetFilters}
            >
                Скинути фільтри
            </Button>
        </Form>
    )
})

export default SkinFilters
