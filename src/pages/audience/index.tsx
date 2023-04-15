import AddObject from '../../components/AddObject'
import { useParams } from 'react-router-dom'
import ViewAudience from '../../components/viewAudience'

const Audience = () => {

    let {id} = useParams()

  return (
    <main>
      {/* <ViewAudience/> */}
      <AddObject/>
    </main>
  )
}

export default Audience