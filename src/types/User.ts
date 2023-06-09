import { Institution } from "./Institution";
import { MainViewRoutes } from "./Routes";
import { TeacherInstitution } from "./TeacherInstitution";
import { MenuBarData } from "./UI";

export type User = {
  id: string;
  role: Roles;
  email: string;
  fullName: string;

  avatarId: string | null;
  institutions: Institution[];
  teacherInstitution: TeacherInstitution;
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
export type RoledMenuOnlyAdminOptions = { admin: MenuBarData[] };

export const roledMenuBarOptions: RoledMenuBarOptions = {
  teacher: [
    {
      link: MainViewRoutes.cabinets,
      title: "QR-коды"
    },
    {
      link: MainViewRoutes.items,
      title: "Предметы"
    }
  ],
  admin: [
    {
      link: MainViewRoutes.cabinets,
      title: "QR-коды"
    },
    {
      link: MainViewRoutes.items,
      title: "Предметы"
    },
    {
      link: MainViewRoutes.users,
      title: "Пользователи"
    },
    {
      link: MainViewRoutes.institutions,
      title: "Организации"
    }
  ]
};

export const roledUserEditDataBarOptions: RoledMenuOnlyAdminOptions = {
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

export const roledCabinetEditDataBarOptions = (role?: keyof RoledMenuBarOptions, allowedToEdit?: boolean): MenuBarData[] => {
  if (role === "teacher") {
    return allowedToEdit
      ? [
          {
            title: "удаление",
            link: "delete"
          },
          allowedToEdit && {
            title: "редактирование",
            link: "edit"
          }
        ]
      : [];
  } else {
    return [
      {
        title: "редактирование",
        link: "edit"
      },
      {
        title: "удаление",
        link: "delete"
      }
    ];
  }
};

export const roledItemEditDataBarOptions: RoledMenuBarOptions = {
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

export const roledUserDataBarOptions: RoledMenuBarOptions = {
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

export type LoginFormProps = {
  email: string;
  password: string;
};
