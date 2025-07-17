import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import {
	Button, Col, Dropdown, Form, FormControl, Modal, Row
} from 'react-bootstrap'
import {
	createSkin, updateSkin,
	fetchHeroes, fetchRarities, fetchTreasures, fetchTypes
} from '../../http/skinAPI'
import { Context } from '../../index'

const CreateSkin = observer(({ show, onHide, editData, onUpdate }) => {
	const { skin } = useContext(Context)

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])
	const [selectedHero, setSelectedHero] = useState({})
	const [selectedType, setSelectedType] = useState({})
	const [selectedRarity, setSelectedRarity] = useState({})
	const [selectedTreasure, setSelectedTreasure] = useState({})

	useEffect(() => {
		fetchTypes().then(data => skin.setTypes(data))
		fetchHeroes().then(data => skin.setHeroes(data))
		fetchRarities().then(data => skin.setRarities(data))
		fetchTreasures().then(data => skin.setTreasures(data))
	}, [skin])

	useEffect(() => {
		if (editData) {
			setName(editData.name)
			setPrice(editData.price)
			setFile(null) 
			setInfo(editData.info || [])

			skin.setSelectedType(skin.types.find(t => t.id === editData.typeId) || {})
			skin.setSelectedHero(skin.heroes.find(h => h.id === editData.heroId) || {})
			skin.setSelectedRarity(skin.rarities.find(r => r.id === editData.rarityId) || {})
			skin.setSelectedTreasure(skin.treasures.find(t => t.id === editData.treasureId) || {})
		} else {
			setName('')
			setPrice(0)
			setInfo([])
			skin.setSelectedType({})
			skin.setSelectedHero({})
			skin.setSelectedRarity({})
			skin.setSelectedTreasure({})
		}
	}, [editData, skin.types, skin.heroes, skin.rarities, skin.treasures, skin])

	const selectFile = e => setFile(e.target.files[0])
	const addInfo = () => setInfo([...info, { title: '', description: '', number: Date.now() }])
	const removeInfo = number => setInfo(info.filter(i => i.number !== number))
	const changeInfo = (key, value, number) =>
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
	
		const handleSubmit = async () => {
			try {
				if (
				!selectedHero.id || 
				!selectedRarity.id || 
				!selectedType.id || 
				!selectedTreasure.id
				) {
				alert("Заповни всі поля: Герой, Рідкість, Тип і Трежер")
				return
				}

				const isInfoValid = info.every(i => i.title?.trim() && i.description?.trim())
				if (!isInfoValid) {
				alert("Заповни всі властивості: назву і опис")
				return
				}

				const formData = new FormData()
				formData.append('name', name)
				formData.append('price', `${price}`)
				formData.append('heroId', selectedHero.id)
				formData.append('rarityId', selectedRarity.id)
				formData.append('typeId', selectedType.id)
				formData.append('treasureId', selectedTreasure.id)
				formData.append('info', JSON.stringify(info))

				if (file) {
				formData.append('img', file)
				}

				const response = editData
				? await updateSkin(editData.id, formData)
				: await createSkin(formData)

				console.log("✅ Відповідь від бекенду:", response)
				onUpdate()
				onHide()
			} catch (e) {
				console.error("❌ Помилка при збереженні скіна:", e)
				alert("Помилка при збереженні. Перевір консоль.")
			}
			}


	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>{editData ? 'Редагувати скін' : 'Додати скін'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2'>
					<Dropdown.Toggle>{selectedType.name || "Тип"}</Dropdown.Toggle>
					<Dropdown.Menu>
						{skin.types.map(t => (
						<Dropdown.Item key={t.id} onClick={() => setSelectedType(t)}>
							{t.name}
						</Dropdown.Item>
						))}
					</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2'>
					<Dropdown.Toggle>{selectedRarity.name || "Рідкість"}</Dropdown.Toggle>
					<Dropdown.Menu>
						{skin.rarities.map(r => (
						<Dropdown.Item key={r.id} onClick={() => setSelectedRarity(r)}>
							{r.name}
						</Dropdown.Item>
						))}
					</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2'>
					<Dropdown.Toggle>{selectedHero.name || "Герой"}</Dropdown.Toggle>
					<Dropdown.Menu>
						{skin.heroes.map(h => (
						<Dropdown.Item key={h.id} onClick={() => setSelectedHero(h)}>
							{h.name}
						</Dropdown.Item>
						))}
					</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2'>
					<Dropdown.Toggle>{selectedTreasure.name || "Трежер"}</Dropdown.Toggle>
					<Dropdown.Menu>
						{skin.treasures.map(t => (
						<Dropdown.Item key={t.id} onClick={() => setSelectedTreasure(t)}>
							{t.name}
						</Dropdown.Item>
						))}
					</Dropdown.Menu>
					</Dropdown>

					<FormControl value={name} onChange={e => setName(e.target.value)} className='mt-3' placeholder='Назва скіна' />
					<FormControl value={price} onChange={e => setPrice(+e.target.value)} className='mt-3' placeholder='Ціна' type='number' />
					<FormControl className='mt-3' type='file' onChange={selectFile} />
					<hr />
					<Button variant='outline-dark' onClick={addInfo}>Додати властивість</Button>
					{info.map(i =>
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} placeholder="Назва властивості" />
							</Col>
							<Col md={4}>
								<Form.Control value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} placeholder="Опис" />
							</Col>
							<Col md={4}>
								<Button onClick={() => removeInfo(i.number)} variant="outline-danger">Видалити</Button>
							</Col>
						</Row>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
			<Button variant="outline-danger" onClick={onHide}>Закрити</Button>
			<Button variant="outline-success" onClick={handleSubmit}>
				{editData ? 'Зберегти зміни' : 'Додати'}
			</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateSkin
