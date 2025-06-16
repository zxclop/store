import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import {
	Button,
	Col,
	Dropdown,
	Form,
	FormControl,
	Modal,
	Row
} from 'react-bootstrap'
import {
	createSkin,
	updateSkin,
	fetchHeroes,
	fetchRarities,
	fetchTreasures,
	fetchTypes
} from '../../http/skinAPI'
import { Context } from '../../index'

const CreateSkin = observer(({ show, onHide, editData, onUpdate }) => {
	const { skin } = useContext(Context)
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchTypes().then(data => skin.setTypes(data))
		fetchHeroes().then(data => skin.setHeroes(data))
		fetchRarities().then(data => skin.setRarities(data))
		fetchTreasures().then(data => skin.setTreasures(data))
	}, [])

	useEffect(() => {
		if (editData) {
			setName(editData.name)
			setPrice(editData.price)
			skin.setSelectedType(skin.types.find(t => t.id === editData.typeId))
			skin.setSelectedHero(skin.heroes.find(h => h.id === editData.heroId))
			skin.setSelectedRarity(skin.rarities.find(r => r.id === editData.rarityId))
			skin.setSelectedTreasure(skin.treasures.find(t => t.id === editData.treasureId))
			setInfo(editData.info || [])
		} else {
			setName('')
			setPrice(0)
			skin.setSelectedType({})
			skin.setSelectedHero({})
			skin.setSelectedRarity({})
			skin.setSelectedTreasure({})
			setInfo([])
			setFile(null)
		}
	}, [editData, skin])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(
			info.map(i => (i.number === number ? { ...i, [key]: value } : i))
		)
	}
	const selectFile = e => {
		setFile(e.target.files[0])
	}

const handleSubmit = async () => {
	if (!name || !skin.selectedType.id || !skin.selectedRarity.id || !price) {
		alert("Ведіть всі необхідні поля")
		return 
	}

	const payload = {
		name,
		price,
		heroId: skin.selectedHero.id,
		typeId: skin.selectedType.id,
		rarityId: skin.selectedRarity.id,
		treasureId: skin.selectedTreasure.id,
		info: JSON.stringify(info)
	}

	try {
		if (editData) {
			await updateSkin(editData.id, payload)
		} else {
			const formData = new FormData()
			formData.append('name', name)
			formData.append('price', `${price}`)
			formData.append('img', file)
			formData.append('heroId', skin.selectedHero.id)
			formData.append('typeId', skin.selectedType.id)
			formData.append('rarityId', skin.selectedRarity.id)
			formData.append('treasureId', skin.selectedTreasure.id)
			formData.append('info', JSON.stringify(info))
			await createSkin(formData)
		}
		onUpdate()
		onHide()
	} catch (err) {
		console.error("❌ Помилка при створенні/редагуванні скіна:", err)
		alert("Помилка при збереженні скіна. Перевір консоль.")
	}
}


	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{editData ? 'Редагувати скін' : 'Додати скін'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedType.name || 'Виберіть тип'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.types?.map(type => (
								<Dropdown.Item onClick={() => skin.setSelectedType(type)} key={type.id}>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedRarity.name || 'Виберіть рідкість'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.rarities?.map(rarity => (
								<Dropdown.Item onClick={() => skin.setSelectedRarity(rarity)} key={rarity.id}>
									{rarity.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedHero.name || 'Оберіть героя'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.heroes?.map(hero => (
								<Dropdown.Item onClick={() => skin.setSelectedHero(hero)} key={hero.id}>
									{hero.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedTreasure.name || 'Виберіть трежер'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.treasures?.map(treasure => (
								<Dropdown.Item onClick={() => skin.setSelectedTreasure(treasure)} key={treasure.id}>
									{treasure.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<FormControl
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введіть назву скіна'
					/>
					<FormControl
						onChange={e => setPrice(Number(e.target.value))}
						value={price}
						className='mt-3'
						placeholder='Вкажіть ціну'
						type='number'
					/>
					<FormControl className='mt-3' type='file' onChange={selectFile} />
					<hr />
					<Button variant='outline-dark' onClick={addInfo}>Додати властивість</Button>
					{info.map(i => (
						<Row className='mt-4' key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
									placeholder='Назва властивості'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={e => changeInfo('description', e.target.value, i.number)}
									placeholder='Опис'
								/>
							</Col>
							<Col md={4}>
								<Button onClick={() => removeInfo(i.number)} variant={'outline-danger'}>
									Видалити
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрити
				</Button>
				<Button variant='outline-success' onClick={handleSubmit}>
					{editData ? 'Зберегти зміни' : 'Додати'}
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateSkin;