import { MenuBarData } from "./UI";

export type User = {
  id: string;
  role: Roles;
  email: string;
  fullName: string;

  avatarId: string | null;
  institutions: any[];
};

export enum Roles {
  teacher = "Учитель",
  admin = "Администратор"
}

export type RoledMenuBarOptions = { teacher: MenuBarData[]; admin: MenuBarData[] };

export const roledMenuBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      link: "/",
      title: "QR-коды"
    }
  ],
  admin: [
    {
      link: "/",
      title: "QR-коды"
    },
    {
      link: "/organizations",
      title: "Организации"
    },
    {
      link: "/objects",
      title: "Предметы"
    },
    {
      link: "/users",
      title: "Пользователи"
    }
  ]
};

export const roledEditDataBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      title: "редактирование",
      link: "profile/edit"
    },
    {
      title: "выйти",
      link: "profile/logout"
    }
  ],
  admin: [
    {
      title: "редактирование",
      link: "profile/edit"
    },
    {
      title: "выйти",
      link: "profile/logout"
    }
  ]
};
