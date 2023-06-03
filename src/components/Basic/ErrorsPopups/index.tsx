import styles from "./ErrorsPopups.module.scss";
import { useAction, useAppSelector } from "helpers/redux";
import { ErrorCategories, ErrorPopup } from "redux/reducers/errors.reducer";
import { memo, useEffect } from "react";

const ErrorPopupComponent: React.FC<ErrorPopup> = memo(
  ({ id, description, type }) => {
    const { removeError } = useAction();

    useEffect(() => {
      let timeout = setTimeout(() => {
        removeError({ id });
      }, 5000);

      return () => clearTimeout(timeout);
    }, []);

    return (
      <div
        style={{
          background: "red",
          borderRadius: "10px",
          left: "50%",
          padding: "15px",
          width: "100%",
          cursor: "pointer"
        }}
        onClick={() => removeError({ id })}>
        <h5>Ошибка/{ErrorCategories[type]}</h5>
        <p style={{ fontSize: "16px" }}>{description}</p>
      </div>
    );
  },
  (prev, next) => prev.id === next.id
);

const ErrorsPopupWrapper: React.FC = () => {
  const errors = useAppSelector(state => state.errors);

  return (
    <div
      style={{
        // в общем передизайнить под пк чтобы они справа сбоку были, не больше 30% экрана от пк до планшетного размера
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        right: 0,
        // в силях изменить на ширине 700 макс ширину, добавить по бокам отступы от экрана как у остального приложения
        padding: "16px 0px",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "10px",
        zIndex: 3,
        width: "100%"
      }}>
      {errors.map(e => (
        <ErrorPopupComponent key={e.id} {...e} />
      ))}
    </div>
  );
};

export default ErrorsPopupWrapper;
