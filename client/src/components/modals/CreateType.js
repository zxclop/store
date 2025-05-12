import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { createType } from '../../http/skinAPI'

const CreateType = ({ show, onHide }) => {
	const [value, setValue] = useState('')

	const addType = () => {
		createType({ name: value }).then(data => {
			console.log('Type successfully created:', data)
			setValue('')
			onHide()
		})
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Add type</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter skin type'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addType}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

 export default CreateType
