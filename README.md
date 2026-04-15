# Nest Simple REST Service

Простой REST API на Nest.js с авторизацией JWT, PostgreSQL и Prisma ORM.

## 🚀 Технологии

- **Nest.js** — TypeScript фреймворк для Node.js
- **PostgreSQL** — реляционная база данных
- **Prisma** — type-safe ORM
- **JWT** — авторизация через токены
- **Docker** — контейнеризация PostgreSQL
- **Swagger** — документация API
- **class-validator** — валидация DTO

## 📋 Требования

- Node.js 18+
- Docker и Docker Compose
- npm или yarn

## 🔧 Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Файл `.env` уже содержит правильные настройки для локальной разработки с Docker.

### 3. Запуск PostgreSQL в Docker

```bash
docker-compose up -d
```

### 4. Создание и применение миграций

```bash
npm run prisma:migrate
```

При первой установке используйте:

```bash
npm run prisma:reset
npm run prisma:migrate
```

### 5. Запуск приложения

```bash
npm run start:dev
```

Приложение будет доступно на `http://localhost:3000`

## 📚 API Документация

Swagger UI доступен по адресу: `http://localhost:3000/api`

## 🔐 API Эндпоинты

### Auth (публичные)

- `POST /auth/register` — регистрация пользователя
- `POST /auth/login` — авторизация и получение JWT токена
- `POST /auth/refresh` — обновление access токена через refresh токен
- `POST /auth/logout` — выход из системы (удаление refresh токена)

### Users (требуют авторизацию)

- `GET /users` — получить всех пользователей
- `GET /users/:id` — получить пользователя по ID
- `POST /users` — создать пользователя
- `PATCH /users/:id` — обновить пользователя
- `DELETE /users/:id` — удалить пользователя

### Posts (требуют авторизацию)

- `GET /posts` — получить все посты (с авторами)
- `GET /posts/:id` — получить пост по ID (с автором)
- `POST /posts` — создать пост
- `PATCH /posts/:id` — обновить пост
- `DELETE /posts/:id` — удалить пост

## 🧪 Примеры запросов

### Регистрация

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Авторизация

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Ответ:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Создание поста (с токеном)

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "This is the content",
    "authorId": 1
  }'
```

## 📁 Структура проекта

```
src/
├── auth/                  # Модуль авторизации
│   ├── dto/              # LoginDto, RegisterDto, RefreshDto
│   ├── strategies/       # JWT стратегия
│   ├── guards/           # JWT Guard, Roles Guard
│   └── decorators/       # Public декоратор, Roles декоратор
├── common/               # Общие модули
│   ├── dto/              # PaginationDto
│   ├── filters/          # HttpExceptionFilter
│   └── interceptors/     # TransformInterceptor
├── database/             # Модуль базы данных
│   └── database.service.ts # PrismaService
├── users/                 # Модуль пользователей
│   ├── dto/              # CreateUserDto, UpdateUserDto
│   └── entities/         # User entity
├── posts/                 # Модуль постов
│   ├── dto/              # CreatePostDto, UpdatePostDto
│   └── entities/         # Post entity
├── app.module.ts          # Корневой модуль
└── main.ts                # Точка входа
```

## 🔒 Безопасность

### Хеширование паролей

Пароли хешируются с использованием bcrypt перед сохранением в базу данных:

```typescript
// src/auth/auth.service.ts
const hashedPassword = await bcrypt.hash(registerDto.password, 10);
```

- **bcrypt** — криптографическая хеш-функция для хеширования паролей
- **Salt rounds: 10** — количество раундов хеширования (баланс между скоростью и безопасностью)
- Пароли никогда не хранятся в открытом виде

### JWT Авторизация

- **Access токен** — токен для доступа к API (текущая настройка: 7 дней, в продакшене рекомендуется 15 минут)
- **Refresh токен** — долгоживущий токен (30 дней) для обновления access токена
- **Rotation** — при использовании refresh токена создаётся новый, старый удаляется
- **Хешируется** с секретным ключом из `.env`
- **Срок действия access токена** — настраивается через `JWT_EXPIRES_IN`

### RBAC (Role-Based Access Control)

- **Роли:** `user` (по умолчанию), `admin`
- **Декоратор @Roles('admin')** — ограничение доступа по роли
- **RolesGuard** — глобальный guard для проверки ролей
- Role пользователя включается в JWT payload

### Обработка ошибок

Глобальный exception filter обрабатывает все ошибки и возвращает корректные HTTP статусы:

- **P2002** (duplicate) → 409 Conflict
- **P2025** (not found) → 404 Not Found
- **P2003** (foreign key) → 400 Bad Request
- **ValidationError** → 400 Bad Request
- **UnauthorizedException** → 401 Unauthorized
- **Общие ошибки** → 500 Internal Server Error

## 🗄️ База данных

Схема Prisma (User, Post и RefreshToken):

```prisma
enum Role {
  user
  admin
}

model User {
  id             Int           @id @default(autoincrement())
  email          String        @unique
  password       String
  name           String?
  role           Role          @default(user)
  posts          Post[]
  refreshTokens  RefreshToken[]
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
}
```

## 🛑 Остановка

```bash
# Остановка приложения
Ctrl+C

# Остановка PostgreSQL в Docker
docker-compose down

# Остановка с удалением данных
docker-compose down -v
```

## 📄 Лицензия

MIT
