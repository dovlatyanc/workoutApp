import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import WorkoutLogService from '../../../../services/workout/workout-log.service'
import WorkoutService from '../../../../services/workout/workout.service'

export const useWorkouts = () => {
	// 1. Запрос за тренировками - ДОБАВЛЯЕМ error и isLoading
	const { 
		data, 
		isSuccess, 
		isLoading, 
		error: queryError // переименовываем error
	} = useQuery(
		['get workouts'],
		() => WorkoutService.getAll(),
		{
			select: ({ data }) => data
		}
	)

	const navigate = useNavigate()

	// 2. Мутация для создания лога
	const {
		mutate,
		isLoading: isMutateLoading,
		isSuccess: isSuccessMutate,
		error: mutateError
	} = useMutation(
		['Create new workout log'],
		workoutId => WorkoutLogService.create(workoutId),
		{
			onSuccess({ data }) {
				navigate(`/workout/${data.id}`)
			}
		}
	)

	return {
		data,
		isSuccess,
		mutate,
		isLoading: isLoading || isMutateLoading,
		isSuccessMutate,
		error: queryError || mutateError // возвращаем любую ошибку
	}
}