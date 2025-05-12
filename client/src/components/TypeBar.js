import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '../index'

const TypeBar = observer(() => {
	const { skin } = useContext(Context)

	return (
		<ListGroup>
			{skin.types?.length > 0 ? (
				skin.types.map(type => (
					<ListGroup.Item
						style={{ cursor: 'pointer' }}
						active={type.id === skin.selectedType?.id} // Проверка на undefined
						onClick={() => skin.setSelectedType(type)} // Исправленный вызов
						key={type.id}
					>
						{type.name}
					</ListGroup.Item>
				))
			) : (
				<p>Типы отсутствуют</p>
			)}
		</ListGroup>
	)
})

export default TypeBar
