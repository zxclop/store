import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { fetchTreasures } from '../http/skinAPI'
import { Context } from '../index'

const TreasureBar = observer(() => {
	const { skin } = useContext(Context)

	useEffect(() => {
		fetchTreasures().then(data => {
			skin.setTreasures(data) // Обновляем store
		})
	}, [skin])

	const treasures = skin.treasures || [] // Имя массива в store

	return (
		<ListGroup>
			{treasures.length > 0 ? (
				treasures.map(treasure => (
					<ListGroup.Item
						style={{ cursor: 'pointer' }}
						active={treasure.id === skin.selectedTreasure?.id}
						onClick={() => skin.setSelectedTreasure(treasure)}
						key={treasure.id}
					>
						{treasure.name}
					</ListGroup.Item>
				))
			) : (
				<p>Нет трежеров</p>
			)}
		</ListGroup>
	)
})

export default TreasureBar
