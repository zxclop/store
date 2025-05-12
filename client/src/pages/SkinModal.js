import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Modal } from 'react-bootstrap'

const SkinModal = ({ show, onHide, skin }) => {
	if (!skin) return null

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
			size='lg'
			className='bg-black/50'
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				className='bg-gray-900 text-white rounded-2xl shadow-xl p-6 relative'
			>
				<button
					className='absolute top-4 right-4 bg-gray-700 p-2 rounded-full'
					onClick={onHide}
				>
					<X size={24} />
				</button>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<img
							src={skin.img}
							alt={skin.name}
							className='w-full h-auto rounded-lg border border-gray-700'
						/>
						<div className='flex gap-2 mt-2'>
							{skin.thumbnails.map((thumb, index) => (
								<img
									key={index}
									src={thumb}
									alt={skin.name + ' thumbnail ' + index}
									className='w-16 h-16 border border-gray-700 rounded-lg cursor-pointer'
								/>
							))}
						</div>
					</div>
					<div>
						<h2 className='text-2xl font-bold text-blue-400'>{skin.name}</h2>
						<p className='text-lg text-green-400'>{skin.price} Р</p>
						<div className='flex gap-2 my-2'>
							<span className='bg-gray-700 px-3 py-1 rounded-md'>
								{skin.hero}
							</span>
							<span className='bg-blue-700 px-3 py-1 rounded-md'>
								{skin.rarity}
							</span>
							<span className='bg-gray-700 px-3 py-1 rounded-md'>
								{skin.type}
							</span>
						</div>
						<h3 className='text-xl font-semibold mt-4'>Описание предмета</h3>
						<ul className='list-disc pl-5 text-gray-300'>
							{skin.description.map((line, index) => (
								<li key={index}>{line}</li>
							))}
						</ul>
						<Button className='mt-4 w-full bg-green-500 hover:bg-green-600'>
							В корзину
						</Button>
					</div>
				</div>
			</motion.div>
		</Modal>
	)
}

export default SkinModal
