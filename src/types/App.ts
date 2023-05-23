import { MainViewRoutes, RoutesEnum } from "./Routes";

export enum NodeENV {
  prod = "production",
  dev = "development"
}

export const cabinetViewPath = `/${RoutesEnum.view}/${MainViewRoutes.cabinets}`;
export const itemViewPath = `/${RoutesEnum.view}/${MainViewRoutes.items}`;
export const usersViewPath = `/${RoutesEnum.view}/${MainViewRoutes.users}`;
