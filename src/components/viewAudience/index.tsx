// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
// useNavigate

type CabinetQRCode = {
  imageUrl: string;
  cabinetNumber: number;
};

const mockQRCodes: CabinetQRCode[] = [
  {
    imageUrl: "http://qrcoder.ru/code/?414&8&0",
    cabinetNumber: 414
  }
];

const ViewAudience = () => {




  const [qrCodes] = useState<CabinetQRCode[]>(mockQRCodes);
  let navigate = useNavigate()


  return (
    <div 
    // className={styles.main_view}
    >
        {qrCodes.map(cabinet => (
          <div onClick={()=>{navigate(`audience/${cabinet.cabinetNumber}`)}}>
            <img src={cabinet.imageUrl} alt={cabinet.cabinetNumber.toString()}></img>
            <hr />
            <h3>{cabinet.cabinetNumber}</h3>
          </div>
        ))}
      </div>
  )
}



export default ViewAudience