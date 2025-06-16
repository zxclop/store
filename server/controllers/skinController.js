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
import { formatNamedParameters } from 'sequelize/lib/utils'

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
			setFile(null)
			setInfo(editData.info || [])

			skin.setSelectedType(skin.types.find(t => t.id === editData.typeId))
			skin.setSelectedHero(skin.heroes.find(h => h.id === editData.heroId))
			skin.setSelectedRarity(skin.rarities.find(r => r.id === editData.rarityId))
			skin.setSelectedTreasure(skin.treasures.find(t => t.id === editData.treasureId))
		} else {
			setName('')
			setPrice(0)
			setFile(null)
			setInfo([])
			skin.setSelectedType({})
			skin.setSelectedHero({})
			skin.setSelectedRarity({})
			skin.setSelectedTreasure({})
		}
	}, [editData, skin])

	const selectFile = e => setFile(e.target.files[0])

	const addInfo = () => setInfo([...info, { title: '', description: '', number: Date.now() }])
	const removeInfo = number => setInfo(info.filter(i => i.number !== number))
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const handleSubmit = async () => {
		try {
			const skinData = {
				name,
				price,
				heroId: skin.selectedHero.id,
				rarityId: skin.selectedRarity.id,
				typeId: skin.selectedType.id,
				treasureId: skin.selectedTreasure.id,
				info: JSON.stringify(info),
			}

			let response
			const formData = new FormData()
			for (let key in skinData) {
				formData.append(key, skinData[key])
			}
			if (file) {
				formData.append('img', file)
			}

			if (editData) {
				response = await updateSkin(editData.id, formData)
			} else {
				response = await createSkin(formData)
			}

			onUpdate()
			onHide()
		} catch (err) {
			console.error("❌ Помилка при створенні/редагуванні скіна:", err)
			alert("Помилка. Перевірте всі поля.")
		}
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title> {editData ? 'Редагувати скін' : 'Додати скін'} </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2'>
						<Dropdown.Toggle>{skin.selectedType.name || "Тип"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.types.map(t =>
								<Dropdown.Item key={t.id} onClick={() => skin.setSelectedType(t)}>{t.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2'>
						<Dropdown.Toggle>{skin.selectedRarity.name || "Рідкість"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.rarities.map(r =>
								<Dropdown.Item key={r.id} onClick={() => skin.setSelectedRarity(r)}>{r.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2'>
						<Dropdown.Toggle>{skin.selectedHero.name || "Герой"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.heroes.map(h =>
								<Dropdown.Item key={h.id} onClick={() => skin.setSelectedHero(h)}>{h.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-2'>
						<Dropdown.Toggle>{skin.selectedTreasure.name || "Трежер"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.treasures.map(t =>
								<Dropdown.Item key={t.id} onClick={() => skin.setSelectedTreasure(t)}>{t.name}</Dropdown.Item>
							)}
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
				<Button variant='outline-danger' onClick={onHide}>Закрити</Button>
				<Button variant='outline-success' onClick={handleSubmit}>
					{editData ? 'Зберегти зміни' : 'Додати'}
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateSkin
