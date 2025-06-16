import { useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import SkinModal from './SkinModal'; 

const SkinItem = ({ skin }) => {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<Col md={3} className='mt-3' onClick={() => setShowModal(true)}>
		<Card
			style={{ width: 150, cursor: 'pointer' }}
			border={'light'}
		>
			<img
				width={150}
				height={150}
				src={process.env.REACT_APP_API_URL + skin.img} 
				alt={skin.name}
			/>
			<div>{skin.name}</div>
			<div>{skin.price} $</div>
		</Card>
			</Col>

			<SkinModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				skin={skin}
			/>
		</>
	)
}

export default SkinItem
