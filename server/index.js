import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import sequelize from './db.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import router from './routes/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000
const app = express()

app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Working' })
})

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ alter: true })
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.error('Database connection error:', e)
		console.log(e)
	}
}

start()
