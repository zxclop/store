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
import { createSkin, fetchHeroes, fetchRarities, fetchTreasures, fetchTypes } from '../../http/skinAPI'
import { Context } from '../../index'


const CreateSkin = observer(({ show, onHide }) => {
	const { skin } = useContext(Context)
	const [name, setName] = useState([])
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState([])
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchTypes().then(data =>  skin.setTypes(data))
		fetchHeroes().then(data =>  skin.setHeroes(data))
		fetchRarities().then(data => skin.setRarities(data))
		fetchTreasures().then(data => skin.setTreasures(data))
	}, [skin]) 

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

	const addSkin = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		formData.append('img', file)
		formData.append('heroId', skin.selectedHero.id)
		formData.append('typeId', skin.selectedType.id)
		formData.append('rarityId', skin.selectedRarity.id)
		formData.append('treasureId', skin.selectedTreasure.id)
		formData.append('info', JSON.stringify(info))
		createSkin(formData).then(data => onHide())


}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Add Skin</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedType.name || "Choose type"} </Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.types?.map(type => (
								<Dropdown.Item 
								onClick={() => skin.setSelectedType(type)}
								key={type.id}>{type.name}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2 md-2'>
						<Dropdown.Toggle>{skin.selectedRarity.name ||"Choose rarity"} </Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.rarities?.map(rarity => (
								<Dropdown.Item 
								onClick={() => skin.setSelectedRarity(rarity)}
								key={rarity.id}>{rarity.name}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{skin.selectedHero?.name || "Choose hero"} </Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.heroes?.map(hero => (
								<Dropdown.Item 
								onClick={() => skin.setSelectedHero(hero)}
								key={hero.id}>{hero.name}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{skin.selectedTreasure.name || "Choose treasure"} </Dropdown.Toggle>
						<Dropdown.Menu>
							{skin.treasures?.map(treasure => (
								<Dropdown.Item 
								onClick={() => skin.setSelectedTreasure(treasure)}
								key={treasure.id}>{treasure.name}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<FormControl 
						value={name} 
						onChange={(e => setName(e.target.value))}
						className='mt-3' 
						placeholder='Enter skin name' />
					<FormControl
						onChange={e => setPrice(Number(e.target.value))}
						value={price}
						className='mt-3'
						placeholder='Enter skins price'
						type='number'
					/>
					<FormControl className='mt-3' type='file' onClick={selectFile}/>
					<hr/>
					<Button
						variant='outline-dark' onClick={addInfo}
						> Add mew skin </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Close
				</Button>
				<Button variant='outline-success' onClick={addSkin}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
)
export default CreateSkin
