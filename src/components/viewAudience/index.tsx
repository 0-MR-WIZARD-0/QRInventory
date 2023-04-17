import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./viewAudience.module.scss";
import AddAudience from "../AddAudience";

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

const ViewAudience = () => {
  const [qrCodes] = useState<CabinetQRCode[]>(mockQRCodes);
  let navigate = useNavigate();

  return (
    <div className={styles.wrapperViewAudience}>
      <button className={styles.addAudience}>Добавить новый кабинет +</button>
      {qrCodes.map(cabinet => (
        <div
          onClick={() => {
            navigate(`audience/${cabinet.cabinetNumber}`);
          }}>
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

export default ViewAudience;
