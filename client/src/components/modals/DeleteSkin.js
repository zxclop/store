
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteSkin } from '../../http/skinAPI';
const DeleteSkin = ({ show, onHide, skinId }) => {
	const handleDelete = async () => {
		try {
			await deleteSkin(skinId);
			onHide();
		} catch (error) {
			console.error("Помилка при видаленні скіна:", error);
		}
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Видалити скін</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Ви впевнені, що хочете видалити цей скін?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Скасувати
				</Button>
				<Button variant="danger" onClick={handleDelete}>
					Видалити
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteSkin;
