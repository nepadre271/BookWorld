import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_for_dev'

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Authorization header missing' })
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string }
    return { user: decoded }

  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
