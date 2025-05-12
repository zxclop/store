import { Button, Image, Modal } from 'react-bootstrap'

const SkinModal = ({ show, handleClose, skin }) => {
	if (!skin) return null

	return (
		<Modal show={show} onHide={handleClose} centered size="lg">
			<Modal.Body className="p-4 bg-dark text-white rounded">
				<div className="d-flex flex-column flex-md-row align-items-center gap-4">
					<Image
						src={process.env.REACT_APP_API_URL + skin.img}
						alt={skin.name}
						width={300}
						height={300}
						rounded
						style={{ objectFit: 'cover', boxShadow: '0 0 15px rgba(0,0,0,0.5)' }}
					/>
					<div className="w-100">
						<h2 className="mb-3">{skin.name}</h2>
						<h4 className="text-success mb-3">{skin.price} $</h4>

						{Array.isArray(skin.info) && skin.info.length > 0 ? (
							<ul className="list-unstyled">
								{skin.info.map((item, idx) => (
									<li key={idx} className="mb-2">
										<strong>{item.title}</strong>: {item.description}
									</li>
								))}
							</ul>
						) : (
							<p className="text-muted">Описание недоступно</p>
						)}

						<Button variant="success" size="lg" className="w-100 mt-3">
							Добавить в корзину
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default SkinModal
