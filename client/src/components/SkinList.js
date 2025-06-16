import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '../index'
	import SkinItem from './SkinItem'

const SkinList = observer(({ skins }) => {
	const { skin } = useContext(Context)
	return (
		<Row className='d-flex'>
			{skin.skins.map(skin => (
				<SkinItem key={skin.id} skin={skin} />
			))}
		</Row>
	)
})
export default SkinList
