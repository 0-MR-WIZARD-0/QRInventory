import { MainViewRoutes, RoutesEnum } from "./Routes";

export enum NodeENV {
  prod = "production",
  dev = "development"
}

export const cabinetViewPath = `/${RoutesEnum.view}/${MainViewRoutes.cabinets}`;
