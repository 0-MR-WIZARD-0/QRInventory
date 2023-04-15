import styles from "./header.module.scss";
import { Icon } from "../Icon";

const Header = () => {
  return (
    <div className={styles.wrapperHeader}>
      <Icon icon='logo' width={32} height={32} />
      <div>
        <h3>QRInventory</h3>
        <p>проект инвентаризации организаций</p>
      </div>
    </div>
  );
};

export default Header;
