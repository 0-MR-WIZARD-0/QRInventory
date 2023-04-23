import { InstitutionShort } from "./Institution";
import { MainViewRoutes } from "./Routes";
import { MenuBarData } from "./UI";

export type User = {
  id: string;
  role: Roles;
  email: string;
  fullName: string;

  avatarId: string | null;
  institutions: InstitutionShort[];
};

export enum UserErrors {
  user_not_authed = "Пользователь не авторизован"
}

export enum RolesNaming {
  teacher = "Учитель",
  admin = "Администратор"
}

export enum Roles {
  teacher = "teacher",
  admin = "admin"
}

export type RoledMenuBarOptions = { teacher: MenuBarData[]; admin: MenuBarData[] };

export const roledMenuBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      link: MainViewRoutes.qrcodes,
      title: "QR-коды"
    }
  ],
  admin: [
    {
      link: MainViewRoutes.qrcodes,
      title: "QR-коды"
    },
    {
      link: MainViewRoutes.organizations,
      title: "Организации"
    },
    {
      link: MainViewRoutes.objects,
      title: "Предметы"
    },
    {
      link: MainViewRoutes.users,
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
