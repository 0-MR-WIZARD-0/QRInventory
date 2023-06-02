import { useEffect } from "react";
import styles from "./PopUp.module.scss"
import { useAppDispatch } from "redux/store";
import { clearError } from "redux/reducers/error.reducer";

interface PopupProps {
    error?: string;
}

const PopUp: React.FC<PopupProps> = ({error}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
          setTimeout(() => {
            dispatch(clearError());
          }, 1000);
        }
      }, [error, dispatch]);
    
      if (!error) return null;
    
      return (
        <div className={styles.popup}>
            <p>{error}</p>
        </div>
      );
}

export default PopUp