import styles from './header.module.scss'
import Image from '../Image'

const Header = () => {
  return (
    <div className={styles.wrapperHeader}>
        <div>
            <Image name={"logo"}/>
        </div>
        <div>
            <h3>QRInventory</h3>
            <p>проект инвентаризации организаций</p>    
        </div>
    </div>
  )
}

export default Header