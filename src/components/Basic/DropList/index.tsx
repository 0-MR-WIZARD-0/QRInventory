import { Cabinet } from "types/Cabinet";

type teacher = {
    data: Cabinet | undefined;
}



const DroplistTeacher:React.FC<teacher> = (data) => {
  return (
    <div>
        {
          data.data?.teachers.map((elem)=>(
            <div key={elem.id}>
                {elem.fullName}
            </div>
          ))  
        }
    </div>
  )
}

export default DroplistTeacher