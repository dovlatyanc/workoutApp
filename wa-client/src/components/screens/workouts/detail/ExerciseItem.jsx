import cn from 'clsx'
import { useNavigate } from 'react-router-dom'

import styles from './Workout.module.scss'

const ExerciseItem = ({ exerciseLog }) => {
	const navigation = useNavigate()

	if (!exerciseLog) {
		return (
			<div className={styles.item}>
				<button disabled>
					<span>Загрузка...</span>
				</button>
			</div>
		)
	}

	// Используем optional chaining для безопасности
	 const exercise = exerciseLog.Exercise?.[0] || {}
	const exerciseName = exercise?.name || 'Упражнение'
	const iconPath = exercise?.iconPath

	return (
		<div
			className={cn(styles.item, {
				[styles.completed]: exerciseLog?.isCompleted
			})}
		>
			<button
				aria-label='Move to exercise'
				onClick={() => exerciseLog?.id ? navigation(`/exercise/${exerciseLog.id}`) : null}
				disabled={!exerciseLog?.id}
			>
				<span>{exerciseName}</span>
				
				{iconPath && (
					<img
						src={`${import.meta.env.VITE_SERVER_URL}${iconPath}`}
						height='34'
						alt={exerciseName}
						draggable={false}
					/>
				)}
			</button>
		</div>
	)
}

export default ExerciseItem