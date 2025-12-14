import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

import { generateToken } from './generate-token.js'

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	console.log('Login attempt for email:', email)

	try {
		const user = await prisma.user.findUnique({
			where: { email }
		})

		console.log('User found:', !!user)

		// Проверяем что пользователь найден
		if (!user) {
			console.log('User not found')
			return res.status(401).json({ error: 'Email and password are not correct' })
		}

		console.log('Verifying password...')

		// Проверяем пароль
		const isValidPassword = await verify(user.password, password)
		
		console.log('Password valid:', isValidPassword)

		if (!isValidPassword) {
			console.log('Invalid password')
			return res.status(401).json({ error: 'Email and password are not correct' })
		}

		// Генерируем токен
		const token = generateToken(user.id)
		console.log('Token generated for user:', user.id)

		// Возвращаем данные (без пароля)
		const userResponse = {
			id: user.id,
			email: user.email,
			name: user.name,
			images: user.images
			// Не включаем password!
		}

		res.json({ 
			user: userResponse, 
			token 
		})

		console.log('Login successful')

	} catch (error) {
		console.error('Login error:', error)
		console.error('Error stack:', error.stack)
		res.status(500).json({ 
			error: 'Server error',
			details: error.message 
		})
	}
})

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName(),
			images: ['/images/before.jpg', '/images/after.jpg']
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
