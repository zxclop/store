import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { createTreasure } from '../../http/skinAPI'

const CreateTreasure = ({ show, onHide }) => {
	const [value, setValue] = React.useState('')

const addTreasure = () => {
		createTreasure({ name: value }).then(data => {
			console.log('Treasure successfully created:', data)
			setValue('')
			onHide()
		})
	}
	
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Add treasure</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter skin treasure'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addTreasure}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateTreasure
