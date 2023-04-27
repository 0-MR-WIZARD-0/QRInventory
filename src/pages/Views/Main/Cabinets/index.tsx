import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./view.main.cabinets.module.scss";
import { cabinetViewPath } from "types/App";

type CabinetQRCode = {
  imageUrl: string;
  cabinetNumber: number;
};

const mockQRCodes: CabinetQRCode[] = [
  {
    imageUrl: "http://qrcoder.ru/code/?414&8&0",
    cabinetNumber: 414
  },
  {
    imageUrl: "http://qrcoder.ru/code/?414&8&0",
    cabinetNumber: 414
  },
  {
    imageUrl: "http://qrcoder.ru/code/?414&8&0",
    cabinetNumber: 414
  },
  {
    imageUrl: "http://qrcoder.ru/code/?414&8&0",
    cabinetNumber: 414
  }
];

const ViewCabinets = () => {
  const [qrCodes] = useState<CabinetQRCode[]>(mockQRCodes);
  let navigate = useNavigate();

  return (
    <div className={styles.wrapperViewCabinets}>
      <button>Добавить новый кабинет +</button>
      {qrCodes.map((cabinet, i) => (
        <div
          onClick={() => {
            navigate(`${cabinetViewPath}/${cabinet.cabinetNumber}`);
          }}
          key={cabinet.cabinetNumber + i}>
          <div className={styles.img}>
            <img src={cabinet.imageUrl} alt={cabinet.cabinetNumber.toString()}></img>
          </div>
          <h3>Кабинет {cabinet.cabinetNumber}</h3>
          <div className={styles.info}>
            <p>Учителей: 20</p>
            <p>Предметов: 20</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewCabinets;