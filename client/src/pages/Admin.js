import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateHero from '../components/modals/CreateHero'
import CreateRarity from '../components/modals/CreateRarity'
import CreateSkin from '../components/modals/CreateSkin'
import CreateTreasure from '../components/modals/CreateTreasure'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
	const [typeVisible, setTypeVisible] = useState(false)
	const [heroVisible, setHeroVisible] = useState(false)
	const [rarityVisible, setRarityVisible] = useState(false)
	const [treasureVisible, setTreasureVisible] = useState(false)
	const [skinVisible, setSkinVisible] = useState(false)
	return (
		<Container style={{ position: 'relative', zIndex: 2 }}>
			<h2>Admin panel</h2>
			<Button
				variant='outline-dark'
				className='mt-4 p-2'
				onClick={() => setTypeVisible(true)}
			>
				Add type
			</Button>
			<Button
				variant='outline-dark'
				className='mt-4 p-2'
				onClick={() => setHeroVisible(true)}
			>
				Add hero
			</Button>
			<Button
				variant='outline-dark'
				className='mt-4 p-2'
				onClick={() => setRarityVisible(true)}
			>
				Add rarity
			</Button>
			<Button
				variant='outline-dark'
				className='mt-4 p-2'
				onClick={() => setTreasureVisible(true)}
			>
				Add treasure
			</Button>
			<Button
				variant='outline-dark'
				className='mt-4 p-2'
				onClick={() => setSkinVisible(true)}
			>
				Add skin
			</Button>
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateHero show={heroVisible} onHide={() => setHeroVisible(false)} />
			<CreateRarity
				show={rarityVisible}
				onHide={() => setRarityVisible(false)}
			/>
			<CreateTreasure
				show={treasureVisible}
				onHide={() => setTreasureVisible(false)}
			/>
			<CreateSkin show={skinVisible} onHide={() => setSkinVisible(false)} />
		</Container>
	)
}

export default Admin
