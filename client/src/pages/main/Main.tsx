import "./Main.scss"
import AddAudience from "../../components/addAudience/AddAudience"

const Main = () => {
  return (
    <div className="wrapperMain">
      <div className="wrapperMain_view">
        <div>
          <img src="http://qrcoder.ru/code/?414&8&0" alt="414"></img>
          <hr/>
          <h3>414</h3>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <AddAudience/>
      {/* <div className="wrapperMain_add">
        <input placeholder="Enter the audience number"></input>
        <button>Create QR-code</button>
      </div> */}
    </div>
  )
}

export default Main