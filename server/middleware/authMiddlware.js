export default function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN
		if (!token) {
			return res.status(401).json({ message: 'User is not authorized' })
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decoded
		next()
	} catch (e) {
		res.status(401).json({ message: 'User is not authorized' })
	}
}
