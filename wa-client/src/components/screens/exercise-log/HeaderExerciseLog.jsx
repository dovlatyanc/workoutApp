import cn from 'clsx'

import stylesLayout from '../../layout/Layout.module.scss'
import Header from '../../layout/header/Header'

import styles from './ExerciseLog.module.scss'

const HeaderExerciseLog = ({ isSuccess, exerciseLog }) => {

	const exercise = exerciseLog?.Exercise?.[0]

  if (!exerciseLog || !exercise) {
    return (
      <div
        className={cn(stylesLayout.wrapper, stylesLayout.otherPage)}
        style={{
          backgroundImage: `url('/images/ex-bg-1.jpg')`,
          height: 300
        }}
      >
        <Header backLink="/workouts" />
        <div className={styles.heading}>
          <div>Loading exercise data...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(stylesLayout.wrapper, stylesLayout.otherPage)}
      style={{
        backgroundImage: `url('/images/ex-bg-1.jpg')`,
        height: 300
      }}
    >
      <Header
        backLink={
          isSuccess ? `/workout/${exerciseLog.workoutLogId}` : '/workouts'
        }
      />

      {isSuccess && (
        <div className={styles.heading}>
          <img
            src={
              import.meta.env.VITE_SERVER_URL + exercise.iconPath 
            }
            height='34'
            alt={exercise.name} 
            draggable={false}
          />
          <h1 className={stylesLayout.heading}>{exercise.name}</h1> {}
        </div>
      )}
    </div>
  )
}

export default HeaderExerciseLog