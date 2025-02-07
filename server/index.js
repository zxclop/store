import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import sequelize from './db.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import router from './routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router) // ← Подключаем роутеры на `/api`

app.use(errorHandler)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Working' })
})

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ alter: true }) // Создаст/обновит таблицы
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.error('Database connection error:', e)
	}
}

start()
