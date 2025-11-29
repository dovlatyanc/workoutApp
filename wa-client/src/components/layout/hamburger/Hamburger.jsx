import { CgMenuRight } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import styles from './Hamburger.module.scss'
import Menu from './Menu'

const Hamburger = () => {
	const { isShow, ref, setIsShow } = useOnClickOutside(false)

	return (
		<div className={styles.wrapper} ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{isShow ? <IoClose color='white' size={24}/> : <CgMenuRight color='white' size={24} />}
			</button>
			<Menu isShow={isShow} />
		</div>
	)
}

export default Hamburger
