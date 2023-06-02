export const fullNameValidation = {
  name: "fullName",
  label: "ФИО",
  type: "text",
  placeholder: "",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 7,
      message: "Минимум 7 символов"
    },
    maxLength: {
      value: 40,
      message: "Максимум 40 символов"
    },
    pattern: {
      value: /^[А-ЯЁ][а-яё]+([-][А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+([-][А-ЯЁ][а-яё]+)?(\s[А-ЯЁ][а-яё]+([-][А-ЯЁ][а-яё]+)?)?$/,
      message: "Формат: Белов Николай Егорович"
    }
  }
};

export const emailValidation = {
  name: "email",
  label: "Почта",
  type: "text",
  placeholder: "test@mail.ru",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Невалидный email"
    }
  }
};

export const passwordValidation = {
  name: "password",
  label: "Пароль",
  type: "password",
  placeholder: "••••••••",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 8,
      message: "Минимум 8 символов"
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов"
    }
  }
};

export const oldPasswordValidation = {
  name: "oldPassword",
  label: "Старый пароль",
  type: "password",
  placeholder: "••••••••",
  validation: {
    minLength: {
      value: 8,
      message: "Минимум 8 символов"
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов"
    }
  }
};

export const newPasswordValidation = {
  name: "newPassword",
  label: "Новый пароль",
  type: "password",
  placeholder: "••••••••",
  validation: {
    minLength: {
      value: 8,
      message: "Минимум 8 символов"
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов"
    }
  }
};

export const cabinetValidation = {
  name: "cabinetNumber",
  label: "Номер кабинета",
  type: "text",
  placeholder: "503-A",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 1,
      message: "Минимум 1 символов"
    },
    maxLength: {
      value: 10,
      message: "Максимум 10 символов"
    },
    pattern: {
      value: /^[а-яА-ЯёЁ0-9]+(-[а-яА-ЯёЁ0-9]+)*$/,
      message: "Формат: 1, 504, 504-Я"
    }
  }
};

export const articleValidation = {
  name: "article",
  label: "Артикул",
  type: "text",
  placeholder: "Ш-503-A",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 7,
      message: "Минимум 7 символов"
    },
    maxLength: {
      value: 40,
      message: "Максимум 40 символов"
    },
    pattern: {
      value: /^[а-яА-ЯёЁ0-9]+(-[а-яА-ЯёЁ0-9]+)*$/,
      message: "Формат: Ш-503-К, 5997207710014"
    }
  }
};

export const nameValidation = {
  name: "name",
  label: "Название",
  type: "text",
  placeholder: "Стул обыкновенный",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 5,
      message: "Минимум 5 символов"
    },
    maxLength: {
      value: 40,
      message: "Максимум 40 символов"
    },
    pattern: {
      value: /^(([а-яА-ЯёЁ0-9]+)\s?)*$/,
      message: "Формат: стул обыкновенный, парта"
    }
  }
};

export const titleInstitutionValidation = {
  name: "name",
  label: "Название учреждения",
  type: "text",
  placeholder: "КБТ",
  validation: {
    required: {
      value: true,
      message: "Обязательно к заполнению"
    },
    minLength: {
      value: 2,
      message: "Минимум 2 символа"
    },
    maxLength: {
      value: 50,
      message: "Максимум 50 символов"
    },
    pattern: {
      value: /^(([а-яА-ЯёЁ0-9]+)\s?)*$/,
      message: "Формат: КБТ, Колледж Бизнес Технологий"
    }
  }
};

export const searchValidation = {
  name: "search",
  type: "text",
};