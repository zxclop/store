import { Button, Image, Modal } from 'react-bootstrap'
import { useContext } from 'react'
import { Context } from '../index'
import { cart } from '../store/CartStore'

const SkinModal = ({ show, handleClose, skin }) => {
	const { cart } = useContext(Context)
    if (!skin) return null

    return (
        <Modal show={show} onHide={handleClose} centered size="md">
            <Modal.Body className="bg-dark text-white p-4 rounded" style={{ borderRadius: '12px' }}>
                <Image
                    src={process.env.REACT_APP_API_URL + skin.img}
                    alt={skin.name}
                    fluid
                    rounded
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        marginBottom: '20px',
                        borderRadius: '10px',
                    }}
                />

                <h4 className="mb-3">{skin.name}</h4>

                <p><strong>Hero:</strong> {skin.hero?.name || 'Unknown'}</p>
                <p><strong>Rarity:</strong> {skin.rarity?.name || 'Unknown'}</p>
                <p><strong>Price:</strong> {parseFloat(skin.price).toFixed(2)} $</p>
                <p>
                    <strong>Description:</strong>{' '}
                    {Array.isArray(skin.info) && skin.info.length > 0
                        ? skin.info[0].description
                        : 'No description available'}
                </p>
			<Button
			variant="primary"
			onClick={() => {
				cart.addItem(skin)
				alert("✅ Додано в кошик")
				handleClose()
			}}
			>
			Додати в кошик
			</Button>
            </Modal.Body>
        </Modal>
    )
}

export default SkinModal
