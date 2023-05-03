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

const mockData: Cabinet = {
  cabinetNumber: "326",
  id: "1245-1234-5354-5234",
  items: [
    {
      article: "SH-504",
      id: "1234-5678-9101-1121",
      imageId: "",
      name: "stool"
    }
  ],
  teachers: []
};

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <div>
        <div onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <QRCodeSVG value={location.pathname} />
          <p style={{ textDecoration: "underline" }}>тап сюда или на qr чтобы скопировать ссылку</p>
        </div>
        <h1>Кабинет {cabinetNumber}</h1>
        <div>
          <ul>
            {teachers.map(t => (
              <li>{t.fullName}</li>
            ))}
          </ul>
          <ul>
            {items.map(i => (
              <li>{i.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {/* здесь будут два дроплиста */}
        <ProtectedComponent
          component={
            <div>
              <p>Панель управления кабинетом</p>
              <MenuBar barOptions={roledCabinetEditDataBarOptions["admin"]} />
            </div>
          }
        />
      </div>
    </>
  );
};

const ViewCabinet: React.FC = () => {
  const [cabinetData, setCabinetData] = useState<Cabinet>(mockData);

  const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     await api
  //       .get("/cabinet/", { params: { cabinet: id } })
  //       .then(res => {
  //         setCabinetInfo(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!cabinetData) {
    return <LoadingTransitionComponent />;
  }

  return <ViewElement component={<CabinetComponent {...cabinetData} />} />;
};

export default ViewCabinet;
