import { MenuBar } from "components/Complex/MenuBar";
import ProtectedComponent from "components/Protected/Component";
import { useAppSelector } from "helpers/redux";
import { roledMenuBarOptions, RoledMenuBarOptions, Roles } from "types/User";

import Selector from "../../Basic/Selector";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const { userData } = useAppSelector(state => state.user);

  return (
    <nav className={styles.navbar}>
      <ProtectedComponent component={<MenuBar barOptions={roledMenuBarOptions[userData!.role as unknown as keyof RoledMenuBarOptions]} optionAsNavlink />} />
      <ProtectedComponent component={<Selector userData={userData!} />} roles={[Roles.admin]} />
    </nav>
  );
};

export default Navbar;
