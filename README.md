# MedPluse

**Проект для стартапа**

MedPluse — веб-система для развития клинического мышления у медиков.
Обеспечивает работу с реалистичными клиническими кейсами, детальную обратную связь и аналитику прогресса.

## Используемые технологии

### Backend

- **NestJS** — серверный фреймворк на TypeScript
- **PostgreSQL** — реляционная база данных
- **Prisma** — ORM для работы с базой данных и миграциями
- **JWT (Passport + passport-jwt)** — аутентификация и авторизация
- **Argon2** — безопасное хеширование паролей
- **Class-validator / Class-transformer** — валидация и трансформация DTO
- **Mailer (nestjs-modules/mailer)** — отправка email-уведомлений
- **RxJS** — реактивное программирование
- **Docker** — контейнеризация backend-сервиса и БД

### Frontend

- **Next.js 16** — React-фреймворк с SSR и App Router
- **React 19** — библиотека для построения пользовательских интерфейсов
- **TypeScript** — статическая типизация
- **Tailwind CSS** — утилитарный CSS-фреймворк
- **Radix UI** — headless UI-компоненты
- **React Hook Form** — работа с формами
- **Zod** — схемы и валидация данных
- **Axios** — HTTP-клиент
- **JWT** — работа с токенами авторизации

### Инфраструктура и инструменты

- **Docker / Docker Compose** — локальная и продакшн-среда
- **ESLint + Prettier** — линтинг и форматирование кода
- **Jest / Supertest** — тестирование backend
- **SWC** — быстрый компилятор TypeScript

---

## Инструкция по запуску

### 1. Запуск базы данных

Если у вас **нет запущенной базы данных**, поднимите её с помощью Docker Compose:

```bash
docker compose -f docker-compose.db.yml up -d
```

Если база данных уже запущена и доступна — этот шаг можно пропустить.

---

### 2. Создание базы данных

Подключитесь к контейнеру с PostgreSQL:

```bash
docker exec -it postgres psql -U <USERNAME>
```

Создайте базу данных:

```sql
CREATE DATABASE startup_project_2_db;
```

Выйдите из `psql`:

```sql
\q
```

---

### 3. Запуск приложения

Запустите основной Docker Compose файл:

```bash
docker compose up -d
```

---

### 4. Применение схемы Prisma и заполнение базы

Зайдите внутрь контейнера с приложением:

```bash
docker exec -it api_startup_project_2 sh
```

Выполните команды Prisma:

```bash
npx prisma db push
yarn run db:seed
```

После выполнения этих шагов приложение готово к работе.

---

## Авторы

Багаев Тимур - Developer

Милан Захаренков - UI/UX Designer
