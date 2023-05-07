import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "helpers/axios";
import { Cabinet } from "types/Cabinet";
import ViewElement from "components/Complex/ViewElement";
import { QRCodeSVG } from "qrcode.react";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { roledCabinetEditDataBarOptions } from "types/User";
import ProtectedComponent from "components/Protected/Component";
import { MenuBar } from "components/Complex/MenuBar";
import DropList from "components/Basic/DropList";
import { useAppSelector } from "helpers/redux";



const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items }) => {
  const location = useLocation();

  const { userData } = useAppSelector(state => state.user);

  return (
    <>
      <div>
        <div onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <QRCodeSVG value={location.pathname} />
          <p style={{ textDecoration: "underline" }}>тап сюда или на qr чтобы скопировать ссылку</p>
        </div>
        <h1 key={id}>Кабинет {cabinetNumber}</h1>
      </div>
      <div>
      <DropList items={items} cabinetId={id}/>
      {userData?.role === "admin" ?  <ProtectedComponent
          component={
            <div>
              <p>Панель управления кабинетом</p>
              <MenuBar barOptions={roledCabinetEditDataBarOptions["admin"]} />
            </div>
          }
        /> : ""
      }  
      </div>
    </>
  );
};

const ViewCabinet: React.FC = () => {

  const { id } = useParams();
  const [pageCabinetData, setPageCabinetData] = useState<Cabinet | null | undefined>();
  
  useEffect(() => {
    (async () => {
      try {
        const cabinetData = (await api.get("/cabinet/", { params: { cabinet: id } })).data;
        setPageCabinetData(cabinetData);
      } catch (error) {
        setPageCabinetData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (pageCabinetData === undefined) return <ViewElement component={<LoadingTransitionComponent />} />;
  if (pageCabinetData === null) return <ViewElement component={<b>произошла ошибка при загрузке кабинета или он не найден</b>} />;

  return <ViewElement component={<CabinetComponent {...pageCabinetData}/>} />;
};

export default ViewCabinet;
