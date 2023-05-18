import { useNavigate } from "react-router-dom";
import styles from "./view.main.cabinets.module.scss";
import { cabinetViewPath } from "types/App";
import { useAppSelector, useAction } from "helpers/redux";
import api from "helpers/axios";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { CreateCabinetScript } from "./Scenario";
import { Scenario } from "components/Basic/Scenario";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useEffect } from "react";

const ViewCabinets: React.FC = () => {
  let navigate = useNavigate();

  const { updateCabinets } = useAction();

  const createCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  useEffect(() => {
    (async () => {
      await api.get("/cabinet/all").then(res => {
        updateCabinets(res.data);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { cabinetData } = useAppSelector(state => state.cabinet);

  return (
    <>
      <Scenario ref={createCabinetModalRef} modalName='create-cabinet' script={CreateCabinetScript} />
      <div className={styles.wrapperViewCabinets}>
        <AddNewButton onClick={() => createCabinetModalRef.current?.createModal()} title='Добавить новый кабинет +' />
        {cabinetData?.map(cabinet => (
          <div
            onClick={() => {
              navigate(`${cabinetViewPath}/${cabinet.cabinetNumber}`);
            }}
            key={cabinet.id}>
            <div className={styles.img}>
              <QRCodeSVG value={`${cabinetViewPath}/${cabinet.cabinetNumber}`} />
            </div>
            <h3>Кабинет {cabinet.cabinetNumber}</h3>
            <div className={styles.info}>
              <p>Учителей: {cabinet.teachers?.length}</p>
              <p>Предметов: {cabinet.items?.length}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCabinets;
