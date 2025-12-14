import Loader from '../../../ui/Loader'
import Alert from '../../../ui/alert/Alert'
import React, { useEffect } from 'react' 
import Layout from '../../../layout/Layout'
import styles from '../detail/Workout.module.scss'

import WorkoutItem from './WorkoutItem'
import { useWorkouts } from './useWorkouts'

const ListWorkouts = () => {
	const { data, error, isLoading, isSuccess, isSuccessMutate, mutate } =
		useWorkouts()

	// Для отладки
	React.useEffect(() => {
		if (error) {
			console.error('Workouts query error:', error)
			console.error('Error URL:', error.config?.url)
			console.error('Error response:', error.response)
		}
	}, [error])

	return (
		<>
			<Layout bgImage='/images/workout-bg.jpg' heading='Workout list' />

			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{/* Показываем ошибку из ЗАПРОСА (GET /workouts) */}
				{error && (
					<Alert 
						type='error' 
						text={
							`Error ${error.response?.status || 500}: ` +
							`${error.response?.data?.message || error.message || 'Failed to load workouts'}`
						} 
					/>
				)}
				
				{isSuccessMutate && <Alert text='Workout log created' />}
				{isLoading && <Loader />}
				{isSuccess && (
					<div className={styles.wrapper}>
						{data.map(workout => (
							<WorkoutItem key={workout.id} workout={workout} mutate={mutate} />
						))}
					</div>
				)}

				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
