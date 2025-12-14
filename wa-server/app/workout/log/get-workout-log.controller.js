import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.js'

export const getWorkoutLog = asyncHandler(async (req, res) => {
	try {
		console.log('=== GET WORKOUT LOG START ===')
		console.log('Log ID:', req.params.id)
		
		const logId = +req.params.id
		
		// Проверяем существование лога
		const logExists = await prisma.workoutLog.findUnique({
			where: { id: logId },
			select: { id: true }
		})
		
		console.log('Log exists:', !!logExists)
		
		if (!logExists) {
			return res.status(404).json({ error: 'Workout Log not found!' })
		}
		
		// Правильный запрос с Exercise (с большой буквы)
		const workoutLog = await prisma.workoutLog.findUnique({
			where: { id: logId },
			include: {
				workout: {
					include: {
						exercises: true
					}
				},
				exerciseLogs: {
					orderBy: { id: 'asc' },
					include: {
						Exercise: true,  // ← с большой буквы!
						times: true
					}
				}
			}
		})

		console.log('Workout log loaded')
		console.log('Workout ID:', workoutLog.workoutId)
		console.log('Exercise logs:', workoutLog.exerciseLogs?.length)
		
		// Проверяем что Exercise загрузились
		if (workoutLog.exerciseLogs && workoutLog.exerciseLogs.length > 0) {
			console.log('First exerciseLog Exercise:', workoutLog.exerciseLogs[0].Exercise)
		}
		
		const response = {
			...workoutLog,
			minute: calculateMinute(workoutLog.workout.exercises.length)
		}

		console.log('=== GET WORKOUT LOG SUCCESS ===')
		res.json(response)

	} catch (error) {
		console.error('=== GET WORKOUT LOG ERROR ===')
		console.error('For log ID:', req.params.id)
		console.error('Full error:', error.message)
		console.error('=== END ERROR ===')
		
		res.status(500).json({ 
			error: 'Failed to get workout log',
			details: error.message 
		})
	}
})