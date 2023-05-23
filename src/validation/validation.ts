export const fullNameValidation = {
    name: 'fullName',
    label: 'ФИО',
    type: 'text',
    placeholder: '',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      }
    }
  }

export const emailValidation = {
    name: 'email',
    label: 'Почта',
    type: 'text',
    placeholder: 'test@mail.ru',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Невалидный email'
      }
    }
  }

export const passwordValidation = {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'any-password',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      },
      minLength: {
        value: 8,
        message: 'Минимум 8 символов'
      }
    }
  }

export const cabinetValidation = {
    name: 'cabinetNumber',
    label: 'Номер кабинета',
    type: 'text',
    placeholder: '503-A',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      }
    }
  }

 export const articleValidation = {
    name: 'article',
    label: 'Артикул',
    type: 'text',
    placeholder: 'Ш-503-A',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      },
      minLength: {
        value: 6,
        message: "Минимум 6 символов"
      }
    }
  }

 export const titleValidation = {
    name: 'name',
    label: 'Название',
    type: 'text',
    placeholder: 'Стул обыкновенный',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      }
    }
  }

  export const titleInstitutionValidation = {
    name: 'name',
    label: 'Название учреждения',
    type: 'text',
    placeholder: 'КБТ',
    validation: {
      required: {
        value: true,
        message: 'Обязательно к заполнению'
      }
    }
  }