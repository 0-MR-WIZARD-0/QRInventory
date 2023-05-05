import styles from "./icon.module.scss";

enum AvailableIcons {
  "logo",
  "profile",
  "image"
}

type IconProps = {
  icon: keyof typeof AvailableIcons;
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({ icon, width, height }) => {
  return <i className={styles.icon} style={{ width, height, WebkitMask: `url(/resources/svg/${icon}.svg) no-repeat 50% 50%`, WebkitMaskSize: "contain" }} />;
};

export default Icon;
