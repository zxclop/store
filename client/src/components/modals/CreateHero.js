import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { createHero } from '../../http/skinAPI'

const CreateHero = ({ show, onHide }) => {
	const [value, setValue] = React.useState('')

	const addHero = () => {
		 createHero({ name: value }).then(data => {
		 	console.log('Hero successfully created:', data)
		 	setValue('')
		 	onHide()
		 })
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Add type</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control 
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter hero name' 
					 />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрити
				</Button>
				<Button variant='outline-success' onClick={addHero}>
					Додати
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateHero
