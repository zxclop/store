import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { createRarity } from '../../http/skinAPI'


const CreateRarity = ({ show, onHide }) => {
	const [value, setValue] = React.useState('')

	const addRarity = () => {
		createRarity({ name: value }).then(data => {
			console.log('Rarity successfully created:', data)
			setValue('')
			onHide()
		})
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Add rarity</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter skin rarity'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Close
				</Button>
				<Button variant='outline-success' onClick={addRarity}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	)
}


export default CreateRarity
