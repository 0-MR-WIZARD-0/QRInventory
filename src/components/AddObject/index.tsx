// type optionObject = {
//   title: string,
//   article: string,
// }
import styles from "./add.object.module.scss"

const AddObject = () => {
  return (
    <div className={styles.addObject}>
        <input type="text" placeholder="title"></input>
        <label className='label'>
                        <span className='title'>Download image</span>
                        <input type='file' />
        </label>
        {/* <input type="file"></input> */}
        <input type="text" placeholder="article"></input>
        <button>Create object</button>
    </div>
  )
}

export default AddObject