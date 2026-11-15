# Clothica — Online Clothing Store

[Українська версія](#clothica--інтернет-магазин-одягу) |
[English version](#clothica--online-clothing-store-1)

---

# Clothica — Інтернет-магазин одягу

## Про проєкт

**Clothica** — це frontend частина full-stack вебзастосунку інтернет-магазину
одягу, створеного для зручного та приємного онлайн-шопінгу.

Застосунок дозволяє користувачам переглядати товари та категорії,
ознайомлюватися з асортиментом магазину, створювати обліковий запис,
авторизуватися та взаємодіяти з функціоналом інтернет-магазину.

Frontend взаємодіє з backend через REST API, забезпечуючи динамічне відображення
даних та взаємодію користувача із системою.

**Мета проєкту** — створити сучасний, адаптивний та зручний інтерфейс для
онлайн-магазину одягу Clothica.

## Репозиторії проєкту

- **Frontend:**
  [project-closette-front](https://github.com/konorezzova-spec/project-closette-front)
- **Backend:**
  [backend-final-project](https://github.com/Serhii-Onykiienko/backend-final-project)

## Основні технології

Frontend розроблений з використанням таких технологій:

- **Next.js 16** — React-фреймворк для створення вебзастосунків.
- **React 19** — бібліотека для побудови користувацьких інтерфейсів.
- **TypeScript** — типізована надбудова над JavaScript.
- **Zustand** — керування глобальним станом застосунку.
- **TanStack Query** — отримання, кешування та синхронізація серверних даних.
- **Axios** — виконання HTTP-запитів до API.
- **Formik** — керування формами.
- **Yup** — валідація даних форм.
- **Swiper** — створення слайдерів та каруселей.
- **React Select** — кастомізовані елементи вибору.
- **React Responsive** — робота з адаптивністю інтерфейсу.
- **React Hot Toast** — відображення сповіщень.
- **Next Themes** — керування темами інтерфейсу.
- **ESLint** — перевірка якості коду.

## Основний функціонал

- Головна сторінка магазину з інформацією про Clothica.
- Перегляд каталогу товарів.
- Перегляд категорій товарів.
- Реєстрація та авторизація користувачів.
- Кошик покупок.
- Взаємодія з backend через REST API.
- Форми з валідацією даних.
- Підписка на email-розсилку.
- Адаптивний користувацький інтерфейс.

## Демо та документація

Frontend розгорнутий на платформі Vercel:

- **[Clothica — Live Demo](https://project-closette-front.vercel.app/homePage)**

Backend розгорнутий на платформі Render:

- **[Clothica Backend — Live Server](https://backend-final-project-acec.onrender.com/)**
- **[API Documentation — Swagger UI](https://backend-final-project-acec.onrender.com/api-docs)**

## Як запустити проєкт локально

### Необхідні інструменти

Перед запуском переконайтеся, що у вас встановлені:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Встановлення

1. Клонуйте репозиторій:

   ```bash
   git clone https://github.com/konorezzova-spec/project-closette-front.git
   ```

2. Перейдіть до директорії проєкту:

   ```bash
   cd project-closette-front
   ```

3. Встановіть залежності:

   ```bash
   npm install
   ```

4. За потреби налаштуйте змінні середовища відповідно до конфігурації проєкту та
   підключення до backend API.

5. Запустіть сервер розробки:

   ```bash
   npm run dev
   ```

6. Відкрийте застосунок у браузері:

   ```text
   http://localhost:3000
   ```

### Доступні команди

| Команда         | Опис                        |
| --------------- | --------------------------- |
| `npm run dev`   | Запуск у режимі розробки    |
| `npm run build` | Створення production-збірки |
| `npm start`     | Запуск production-версії    |
| `npm run lint`  | Перевірка коду ESLint       |

## Розгортання (Deployment)

Frontend розгорнутий за допомогою [Vercel](https://vercel.com/).

Для розгортання власної версії:

1. Створіть проєкт на Vercel.
2. Підключіть GitHub-репозиторій.
3. Виберіть Next.js як Framework Preset.
4. Налаштуйте необхідні змінні середовища, якщо вони використовуються у проєкті.
5. Перевірте Build Settings.
6. Запустіть Deployment.

Vercel автоматично створюватиме нове розгортання після оновлення підключеної
гілки GitHub.

## Структура проєкту

```text
project-closette-front/
├── app/                  # Сторінки та маршрути Next.js
├── components/           # Компоненти інтерфейсу
├── fonts/                # Шрифти
├── lib/                  # Допоміжні модулі та логіка
├── public/               # Статичні ресурси
├── types/                # TypeScript типи
├── next.config.ts        # Конфігурація Next.js
├── package.json          # Залежності та команди
└── tsconfig.json         # Конфігурація TypeScript
```

## Ліцензія

Проєкт розроблений з навчальною метою в межах командного фінального проєкту.

---

# Clothica — Online Clothing Store

## About the Project

**Clothica** is the frontend part of a full-stack e-commerce web application
designed to provide a convenient and enjoyable online clothing shopping
experience.

The application allows users to browse products and categories, explore the
store's collection, create an account, log in, and interact with the online
store's features.

The frontend communicates with the backend through a REST API, providing dynamic
data rendering and user interaction.

**Project goal:** to create a modern, responsive, and user-friendly interface
for the Clothica online clothing store.

## Project Repositories

- **Frontend:**
  [project-closette-front](https://github.com/konorezzova-spec/project-closette-front)
- **Backend:**
  [backend-final-project](https://github.com/Serhii-Onykiienko/backend-final-project)

## Technologies

The frontend is built using the following technologies:

- **Next.js 16** — React framework for building web applications.
- **React 19** — library for building user interfaces.
- **TypeScript** — typed superset of JavaScript.
- **Zustand** — global application state management.
- **TanStack Query** — server-state fetching, caching, and synchronization.
- **Axios** — HTTP client for API requests.
- **Formik** — form management.
- **Yup** — form validation.
- **Swiper** — sliders and carousels.
- **React Select** — customizable select components.
- **React Responsive** — responsive interface handling.
- **React Hot Toast** — notifications.
- **Next Themes** — interface theme management.
- **ESLint** — code quality and linting.

## Main Features

- Homepage with information about Clothica.
- Product catalog browsing.
- Product category browsing.
- User registration and authentication.
- Shopping cart.
- Backend integration through REST API.
- Forms with data validation.
- Email newsletter subscription.
- Responsive user interface.

## Live Demo & Documentation

The frontend is deployed on Vercel:

- **[Clothica — Live Demo](https://project-closette-front.vercel.app/homePage)**

The backend is deployed on Render:

- **[Clothica Backend — Live Server](https://backend-final-project-acec.onrender.com/)**
- **[API Documentation — Swagger UI](https://backend-final-project-acec.onrender.com/api-docs)**

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/konorezzova-spec/project-closette-front.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-closette-front
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. If required, configure the environment variables according to the project
   configuration and backend API connection.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the application in your browser:

   ```text
   http://localhost:3000
   ```

### Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Start the production server  |
| `npm run lint`  | Run ESLint checks            |

## Deployment

The frontend is deployed using [Vercel](https://vercel.com/).

To deploy your own instance:

1. Create a project on Vercel.
2. Connect your GitHub repository.
3. Select Next.js as the Framework Preset.
4. Configure the required environment variables, if used by the project.
5. Check the Build Settings.
6. Deploy the application.

Vercel automatically creates a new deployment whenever the connected GitHub
branch is updated.

## Project Structure

```text
project-closette-front/
├── app/                  # Next.js pages and routes
├── components/           # UI components
├── fonts/                # Fonts
├── lib/                  # Utility modules and application logic
├── public/               # Static assets
├── types/                # TypeScript types
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## License

This project was developed for educational purposes as a team final project.
