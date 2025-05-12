import jwt from 'jsonwebtoken'

export default function checkRole(role) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			return next()
		}
		try {
			const authHeader = req.headers.authorization
			if (!authHeader) {
				return res.status(401).json({ message: 'User is not authorized (no header)' })
			}

			const token = authHeader.split(' ')[1] // "Bearer TOKEN"
			if (!token) {
				return res.status(401).json({ message: 'User is not authorized (no token)' })
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			if (decoded.role !== role) {
				return res.status(403).json({ message: 'Access is denied' })
			}

			req.user = decoded
			next()
		} catch (e) {
			console.log('JWT error:', e.message)
			return res.status(401).json({ message: 'User is not authorized (invalid token)' })
		}
	}
}
