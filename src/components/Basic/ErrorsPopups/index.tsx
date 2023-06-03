import { useAction, useAppSelector } from "helpers/redux";
import { ErrorCategories, ErrorPopup } from "redux/reducers/errors.reducer";
import { memo, useEffect } from "react";

const notificationTimeout = 3000;

const ErrorPopupComponent: React.FC<ErrorPopup> = memo(
  ({ id, description, type }) => {
    const { removeError } = useAction();

    useEffect(() => {
      let timeout = setTimeout(() => {
        removeError({ id });
      }, notificationTimeout);

      return () => clearTimeout(timeout);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className = {styles.popup}>
      {errors.map(e => (
        <ErrorPopupComponent key={e.id} {...e} />
      ))}
    </div>
  );
};

export default ErrorsPopupWrapper;
