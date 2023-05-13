import { Institution } from "./Institution";
import { MainViewRoutes } from "./Routes";
import { MenuBarData } from "./UI";

export type User = {
  id: string;
  role: Roles;
  email: string;
  fullName: string;

  avatarId: string | null;
  institutions: Institution[];
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
      link: MainViewRoutes.cabinets,
      title: "QR-коды"
    }
  ],
  admin: [
    {
      link: MainViewRoutes.cabinets,
      title: "QR-коды"
    },
    {
      link: MainViewRoutes.institutions,
      title: "Организации"
    },
    {
      link: MainViewRoutes.items,
      title: "Предметы"
    },
    {
      link: MainViewRoutes.users,
      title: "Пользователи"
    }
  ]
};

export const roledUserEditDataBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      title: "редактирование",
      link: "/profile/edit"
    },
    {
      title: "выйти",
      link: "/auth/logout"
    }
  ],
  admin: [
    {
      title: "редактирование",
      link: "/profile/edit"
    },
    {
      title: "выйти",
      link: "/auth/logout"
    }
  ]
};

export const roledCabinetEditDataBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      title: "редактирование",
      link: "edit"
    },
    {
      title: "удаление",
      link: "delete"
    }
  ],
  admin: [
    {
      title: "редактирование",
      link: "edit"
    },
    {
      title: "удаление",
      link: "delete"
    }
  ]
};
