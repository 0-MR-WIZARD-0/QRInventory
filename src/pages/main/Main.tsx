import { useState } from "react";
import AddAudience from "../../components/AddAudience";
import styles from "./main.module.scss";

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

const Main = () => {
  const [qrCodes] = useState<CabinetQRCode[]>(mockQRCodes);

  return (
    <div className={styles.main}>
      <div className={styles.mainView}>
        {qrCodes.map(cabinet => (
          <div>
            <img src={cabinet.imageUrl} alt={cabinet.cabinetNumber.toString()}></img>
            <hr />
            <h3>{cabinet.cabinetNumber}</h3>
          </div>
        ))}
        <div></div>
        <div></div>
        <div></div>
      </div>
      <AddAudience />
      {/* <div className="wrapperMain_add">
        <input placeholder="Enter the audience number"></input>
        <button>Create QR-code</button>
      </div> */}
    </div>
  );
};

export default Main;
