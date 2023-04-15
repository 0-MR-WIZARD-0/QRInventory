import styles from "./code.info.module.scss"

const CodeInfo = () => {
  return (
    <div className={styles.wrapperCodeInfo}>
        <a>Нажмите сюда или на QR-код, чтобы скопировать ссылку</a>
        <h3>Кабинет 543-А</h3>
    </div>
  )
}

export default CodeInfo