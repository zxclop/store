import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneSkin } from '../http/skinAPI'

const SkinPage = () => {
	const [skin, setSkin] = useState({ info: [] })
	const { id } = useParams
	useEffect(() => {}, [])
	fetchOneSkin(id).then(data => setSkin(data))
	return (
		<Container>
			<Col md={4} className='mt-3'>
				<Image
					width={300}
					height={300}
					src={process.env.REACT_APP_API_URL + skin.img}
				/>
			</Col>
			<Col md={4}>
				<Row>
					<h2>{skin.name}</h2>
					<div className='d-flex align items'></div>
					<h1>Characteristics</h1>
					{skin.info.map((info, index) => (
						<Row
							key={info.id}
							style={{
								backgroind: index % 2 === 0 ? 'lightgray' : 'transparent',
								padding: 10,
							}}
						>
							{info.title}: {info.description}
						</Row>
					))}
				</Row>
			</Col>
			<Col md={4}></Col>
		</Container>
	)
}
export default SkinPage
