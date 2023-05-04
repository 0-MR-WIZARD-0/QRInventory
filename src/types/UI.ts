import { CSSProperties } from "react";

export type MenuBarData = {
  link: string;
  title: string;
};

export const loaderAlt = "Идёт загрузка";

export type TransitionStyles = {
  entering: CSSProperties;
  entered: CSSProperties;
  exiting?: CSSProperties;
  exited?: CSSProperties;
};

export enum SelectMessages {
  placholder = "Выберите учреждение",
  noOptions = "Нет колледжей"
}

export type ImageState = string | null | undefined;
