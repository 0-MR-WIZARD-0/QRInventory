import styles from "./icon.module.scss";

enum AvailableIcons {
  "logo",
  "profile",
  "image",
  "eye-password-hide",
  "eye-password-show",
  "remove-circle-cross",
  "upload"
}

type IconProps = {
  icon: keyof typeof AvailableIcons;
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({ icon, width, height }) => {
  return (
    <i
      className={styles.icon}
      style={{
        width,
        height,
        WebkitMask: `url(/resources/svg/${icon}.svg)  50% 50% / contain no-repeat`,
        WebkitMaskSize: "contain"
      }}
    />
  );
};

export default Icon;
