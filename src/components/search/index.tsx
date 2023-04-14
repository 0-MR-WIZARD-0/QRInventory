import styles from './search.module.scss'

const Search = () => {
  return(
    <input className={styles.search} placeholder="Search" type="text"></input>
  )
}

export default Search