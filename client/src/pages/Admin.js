import React, { useEffect, useState, useContext } from 'react'
import { Button, Container, Table, Modal } from 'react-bootstrap'
import { fetchSkins, deleteSkin } from '../http/skinAPI'
import CreateSkin from '../components/modals/CreateSkin'
import { Context } from '../index'

const Admin = () => {
	const [skins, setSkins] = useState([])
	const [loading, setLoading] = useState(true)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [editSkin, setEditSkin] = useState(null)

	useEffect(() => {
		loadSkins()
	}, [])

	const loadSkins = async () => {
		setLoading(true)
		const data = await fetchSkins()
		setSkins(data?.rows || [])
		setLoading(false)
	}

	const handleDelete = async (id) => {
		if (window.confirm('Ви впевнені, що хочете видалити цей скін?')) {
			await deleteSkin(id)
			loadSkins()
		}
	}

	const handleEdit = (skin) => {
		setEditSkin(skin)
		setShowCreateModal(true)
	}

	return (
		<Container className='mt-4'>
			<h2>Панель адміністратора</h2>
			<Button
				variant='success'
				className='mb-3'
				onClick={() => {
					setEditSkin(null)
					setShowCreateModal(true)
				}}
			>
				Додати скін
			</Button>

			{loading ? (
				<p>Завантаження...</p>
			) : (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Зображення</th>
							<th>Назва</th>
							<th>Ціна</th>
							<th>Дії</th>
						</tr>
					</thead>
					<tbody>
						{skins.map((skin) => (
							<tr key={skin.id}>
								<td>
									<img
										src={process.env.REACT_APP_API_URL + skin.img}
										alt={skin.name}
										width={60}
										height={60}
										style={{ objectFit: 'cover' }}
									/>
								</td>
								<td>{skin.name}</td>
								<td>{skin.price} $</td>
								<td>
									<Button
										variant='warning'
										size='sm'
										onClick={() => handleEdit(skin)}
									>
										Редагувати
									</Button>{' '}
									<Button
										variant='danger'
										size='sm'
										onClick={() => handleDelete(skin.id)}
									>
										Видалити
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			<CreateSkin
				show={showCreateModal}
				onHide={() => setShowCreateModal(false)}
				editData={editSkin}
				onUpdate={() => loadSkins()}
			/>
		</Container>
	)
}

export default Admin