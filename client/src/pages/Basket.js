import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Button, Card, Form } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Basket = observer(() => {
    const { cart } = useContext(Context)
    const total = cart.totalPrice.toFixed(2)
	const navigate = useNavigate()

    return (
		<div className="d-flex flex-wrap justify-content-between p-4 gap-3">
		<div
			style={{
			flex: '1 1 40%',
			minWidth: '300px',
			maxWidth: '1350px',
			marginRight: '10px' 
			}}
		>
			<div className="d-flex justify-content-end gap-2">
			<Button variant="outline-secondary" onClick={() => cart.clearCart()}>
				Очистити
			</Button>
			<Button variant="outline-dark" onClick={() => navigate('/shop')}>
				Повернутись
			</Button>
			</div>

			<h2 className="mb-4 fw-bold">Корзина</h2>

			{Array.isArray(cart.items) && cart.items.length === 0 ? (
			<p>Порожня корзина</p>
			) : (
			<>
				{cart.items.map(skin => (
				<Card key={skin.id} className="mb-3 p-3 shadow-sm">

					<div className="d-flex align-items-center">
					<img
						src={process.env.REACT_APP_API_URL + skin.img}
						alt={skin.name}
						style={{
						width: '150px',
						height: '150px',
						objectFit: 'cover',
						borderRadius: '8px',
						marginRight: '16px'
						}}
					/>

					<div className="flex-grow-1">
						<div className="fw-bold fs-4">{skin.name}</div>
						<div className="fs-5 " style={{ fontSize: '0.9rem' }}>{skin.hero.name}</div>
					</div>
						<div className="d-flex flex-column align-items-end gap-2 ms-3">
						<div className="d-flex align-items-center gap-2">
							<Button variant="secondary" size="sm" onClick={() => cart.decrement(skin.id)}>-</Button>
							<span className="fw-bold">{skin.quantity}</span>
							<Button variant="secondary" size="sm" onClick={() => cart.increment(skin.id)}>+</Button>
							<Button
							variant="light"
							size="sm"
							onClick={() => cart.removeItem(skin.id)}
							style={{
								border: '1px solid #7b1e1e',
								background: '#1a0000',
								boxShadow: '0 0 8px rgba(255, 0, 0, 0.4)',
							}}
							>
							<BsTrash style={{ color: '#ff4444', fontSize: '1.2rem' }} />
							</Button>
						</div>
						<div className="fw-bold fs-5" style={{ fontSize: '0.9rem' }}>
							Всього: {(skin.price * skin.quantity).toFixed(2)} $
						</div>
						</div>
					</div>
				</Card>
				))}
			</>
			)}
		</div>
		
		<Card
			className="p-4 shadow-sm"
			style={{ width: '490px', height: 'fit-content', marginTop: '24px' }}
		>
			<h4 className="fw-bold mb-3">Оплата</h4>
			<Form.Control placeholder="Введіть промокод..." className="mb-3" />

			<div className="d-flex justify-content-between">
			<span>Товари</span>
			<strong>{total} $</strong>
			</div>
			<div className="d-flex justify-content-between">
			<span>Знижка</span>
			<strong>0 $</strong>
			</div>
			<hr />
			<div className="d-flex justify-content-between fs-5">
			<span>Всього</span>
			<strong>{total} $</strong>
			</div>

			<Button className="mt-3 w-100 bg-secondary border-0">
			Продовжити до оплати
			</Button>
		</Card>
		</div>
    )
})

export default Basket
