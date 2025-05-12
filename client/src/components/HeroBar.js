import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Context } from '../index'

// HeroBar component displays a list of hero cards based on the skin context
const HeroBar = observer(() => {
	const { skin } = useContext(Context)

	if (!skin || !Array.isArray(skin.heroes)) {
		return null
	}

	return (
		<Row className='d-flex'>
			{skin.heroes.map(hero => (
				<Card
					key={hero.id}
					className='p-3'
					onClick={() => skin.selectedHero(hero)}
					border={hero.id === skin.selectedHero.id ? 'danger' : 'light'}
				>
					{hero.name}
				</Card>
			))}
		</Row>
	)
})

export default HeroBar
