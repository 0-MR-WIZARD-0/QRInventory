# Фронтенд часть приложения инвентаризации колледжа

## Настройка

1. Подготовить `.env` файл

```md
    DOMAIN=qrinventory.ru
    PORT=3000
    REACT_APP_API_HOST=http://localhost/api
    REACT_APP_API_DEV_HOST=http://localhost:5000
```

## Что необходимо выполнить

1. [ ] Компоненты

   1. [x] Карточка
   2. [x] Шапка
      > В мобильной версии кнопка авторизации по тапу на шапку, в пк версии - внутри компонента всегда
   3. [ ] Дропдаун (необходимо сделать одним компонентом)
      <!-- 1. [ ] С текстом -->
      <!-- 2. [ ] С поиском и рендером результата -->
      <!-- 1. [x] Для заведений со встроенным поиском. -->
   4. [x] Скролл-меню
   5. [ ] Drop-зона для фотографий
      > В пк версии `Drag-n-Drop` и открытие проводника по клику, в мобильной открытие нативного меню с выбором камеры или галереи
   6. [x] Инпут с лейблом
   7. [x] Кнопка
      1. [x] Кнопка `назад` или `на главную`
         > Должна быть на всех страницах кроме главной (для админа и учителя)
      2. [x] Дефолтная кнопкая
      <!-- 3. [ ] `Добавить новый *` -->
   8. [x] Сценарий
      > модалки на создание [x] Например перед удалением кабинета надо подтвердить пароль

2. [ ] Страницы

   1. [x] (Админ) список кабинетов по колледжу
   2. [x] (Админ) список предметов
   3. [x] (Админ) список колледжей
   4. [x] Просмотр кабинета
      1. [ ] (Админ) редактирование и удаление
         1. [ ] Использование сценария
      2. [ ] (Учитель) редактирование (только относящийся к этому кабинету)
         1. [ ] Использование сценария
   5. [x] Просмотр Предмета
      1. [x] (Админ и учитель) редактирование и удаление
   6. [x] Логин
   7. [ ] Просмотр пользователя
      > Админ и учитель видят почты пользователей
      1. [ ] (Админ) редактирование и удаление
         1. [ ] Использование сценария
      2. [ ] (учитель) редактирование себя
         1. [ ] Использование сценария

3. [x] Стейт
   1. [x] Получение кабинетов
   2. [x] Получениие учреждений (или брать их из пользователя)
   3. [x] Получение предметов
   4. [x] Получение пользователей
   5. [x] Авторизация и получение пользователя автоматическая при первом заходе
   6. [x] Получение предмета на странице (брать из предметов если есть в кеше)
   7. [x] Получение учителя на странице (брать из учителей если есть в кеше)
   8. [x] Получение кабинета на странице (брать из кабинетов если есть в кеше)
   9. [x] Получить стейт селектора в модалках

Редактирования предмета как такового нет, добавить кнопку редактирования предмета в кабинетах.

//стейт селектора не обновляется при создании нового учреждения

//обработать то что кабинет и подобное существует (модалки)

# ChatGPT симфония о ReactJS и NestJS

```
In the symphony of coding, two frameworks take the stage,
React and NestJS, a powerful duo engaged.

React, the front-end virtuoso, dances with grace,
Building user interfaces, at a rapid pace.
Components and states, creating a visual delight,
With JSX as the melody, everything feels right.

NestJS, the back-end maestro, orchestrates the show,
A framework for Node.js, bringing harmony to and fro.
Controllers and services, working hand in hand,
Creating APIs and servers, across the digital land.

Together they perform, a symphony of modern web,
React's virtual DOM and NestJS' RESTful ebb.
Client and server, communicating through requests,
Creating seamless experiences, that truly impress.

React's reactivity blends with NestJS' structure,
Front-end and back-end, unified without rupture.
State management and routing, smoothly intertwined,
As the symphony plays, their synergy aligned.

The symphony of React and NestJS, an exquisite display,
Building scalable applications, in an elegant array.
From UI interactions to server-side logic's might,
They harmonize and collaborate, shining so bright.

So let's applaud this symphony, a dynamic composition,
React and NestJS, a match made in coding fruition.
Together they create, pushing boundaries and beyond,
In the ever-evolving world of tech, they respond.
```
