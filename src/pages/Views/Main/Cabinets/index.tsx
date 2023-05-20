import { useNavigate } from "react-router-dom";
import styles from "./view.main.cabinets.module.scss";
import { cabinetViewPath } from "types/App";
import { useAppSelector, useAction } from "helpers/redux";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { CreateCabinetScript } from "./Scenario";
import { Scenario } from "components/Basic/Scenario";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useEffect, useState } from "react";
import { LoadingTransitionComponent } from "components/Basic/Loader";

const ViewCabinets: React.FC = () => {
  let navigate = useNavigate();

  const { fetchCabinetsThunk } = useAction();
  const [page, setPage] = useState(1);
  const nextPage = () => setPage(p => p + 1);
  useEffect(() => {
    fetchCabinetsThunk({ page, perPage: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const createCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { data, loading } = useAppSelector(state => state.viewCabinets);

  return (
    <>
      <Scenario ref={createCabinetModalRef} modalName='create-cabinet' script={CreateCabinetScript} />
      <div className={styles.wrapperViewCabinets}>
        <AddNewButton onClick={() => createCabinetModalRef.current?.createModal()} title='Добавить новый кабинет +' />

        {data?.map(cabinet => (
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
      {loading && <LoadingTransitionComponent />}
    </>
  );
};

export default ViewCabinets;
