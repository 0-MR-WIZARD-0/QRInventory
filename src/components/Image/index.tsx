import { useState } from "react";
import styles from "./image.module.scss";

export enum AvailableImages {
  logo = "logo_key",
  profile = "profile"
}

type ImageProps = {
  name: keyof typeof AvailableImages;
  alt?: string;
};

const Image: React.FC<ImageProps> = ({ name, alt }) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  const path = `${process.env.PUBLIC_URL}/resources/svg/${name}.svg`;
  return loaded ? <img className={styles.image} src={path} alt={alt ?? ""} /> : <div className={`error-placeholder`} onError={() => setLoaded(false)} />;
};

export default Image;
