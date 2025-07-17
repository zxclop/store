import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '../index'
import SkinItem from './SkinItem'

const SkinList = observer(({ skins }) => {
	const { skin } = useContext(Context)
		if (!Array.isArray(skin.skins)) {
		return <div>Завантаження...</div>
	}
	return (
		<Row className='d-flex'>
			{Array.isArray(skin.skins) &&
			skin.skins.map(s => (
				<SkinItem key={s.id} skin={s} />
			))}
		</Row>
	)
})
export default SkinList
