import styles from "./icon.module.scss";

enum AvailableIcons {
  "logo",
  "profile"
}

type IconProps = {
  icon: keyof typeof AvailableIcons;
  width: number;
  height: number;
};

export const Icon: React.FC<IconProps> = ({ icon, width, height }) => {
  return <i className={styles.icon} style={{ width, height, WebkitMask: `url(/resources/svg/${icon}.svg)  no-repeat 50% 50%`, WebkitMaskSize: "contain" }} />;
};
