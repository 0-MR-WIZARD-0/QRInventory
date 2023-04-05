import React from 'react'
import "./AddAudience.scss"

const AddAudience = () => {
  return (
    <div className="wrapperAddAudience">
        <input placeholder="Enter the audience number"></input>
        <select name="" id="">
          <option>Колледж бизнес-технологий</option>
          <option>Колледж современных-технологий</option>
        </select>
        <button>Create QR-code</button>
      </div>
  )
}

export default AddAudience