# Clean Architecture API

Complete RESTful API built with TypeScript, Express, Prisma, PostgreSQL, following Clean Architecture and SOLID principles.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (Admin/User)
- **Task Management**: CRUD operations for tasks with status tracking and priority levels
- **Goal Management**: Activity goals with task associations and progress tracking
- **Financial Management**: Transaction tracking (income/expenses) and financial goals
- **Statistics**: Comprehensive stats for goals and financial data
- **Swagger Documentation**: Complete API documentation at `/api-docs`
- **Rate Limiting**: Protection against abuse
- **Pagination**: All list endpoints support pagination
- **Validation**: Request validation using Zod
- **Error Handling**: Consistent error responses
- **Clean Architecture**: Well-organized code with clear separation of concerns

## 📁 Project Structure

```
src/
├── domain/              # Business entities and repository interfaces
│   ├── entities/
│   └── repositories/
├── application/         # Use cases (business logic)
│   └── use-cases/
├── infrastructure/      # External services implementation
│   ├── database/
│   ├── repositories/
│   └── security/
├── presentation/        # HTTP layer
│   ├── controllers/
│   ├── middlewares/
│   └── routes/
├── shared/             # Shared utilities
│   ├── errors/
│   ├── utils/
│   └── validators/
└── main/               # Application entry point
    ├── config/
    ├── factories/
    ├── server.ts
    └── index.ts
```

## 🛠️ Technologies

- **TypeScript**: Type-safe development
- **Express**: Web framework
- **Prisma**: ORM for PostgreSQL
- **PostgreSQL**: Database
- **Zod**: Schema validation
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Swagger**: API documentation
- **Docker**: Database containerization

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Admin only)

- `GET /api/users` - List all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Tasks

- `POST /api/tasks` - Create task
- `GET /api/tasks` - List tasks (paginated)
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task

### Goals

- `POST /api/goals` - Create goal
- `GET /api/goals` - List goals with stats (paginated)
- `GET /api/goals/stats` - Get goals statistics
- `GET /api/goals/:id` - Get goal by ID
- `PUT /api/goals/:id` - Update goal
- `POST /api/goals/:id/tasks` - Add task to goal
- `DELETE /api/goals/:id/tasks` - Remove task from goal
- `DELETE /api/goals/:id` - Delete goal

### Transactions

- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - List transactions (paginated)
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/:id` - Update transaction
- `PATCH /api/transactions/:id/status` - Update transaction status
- `DELETE /api/transactions/:id` - Delete transaction

### Financial Goals

- `POST /api/financial-goals` - Create financial goal
- `GET /api/financial-goals` - List financial goals with stats (paginated)
- `GET /api/financial-goals/stats` - Get financial goals statistics
- `GET /api/financial-goals/:id` - Get financial goal by ID
- `PUT /api/financial-goals/:id` - Update financial goal
- `POST /api/financial-goals/:id/transactions` - Add transaction to goal
- `DELETE /api/financial-goals/:id/transactions` - Remove transaction from goal
- `DELETE /api/financial-goals/:id` - Delete financial goal

## 🔐 Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

**Header format:**

```
Authorization: Bearer <your_jwt_token>
```

## 📖 Documentation

Full API documentation is available at `http://localhost:3000/api-docs` when the server is running.

## 🏗️ Architecture

This project follows Clean Architecture principles with clear separation between:

1. **Domain Layer**: Pure business logic and entities
2. **Application Layer**: Use cases orchestrating business logic
3. **Infrastructure Layer**: External dependencies (database, security)
4. **Presentation Layer**: HTTP handling (controllers, routes, middlewares)
5. **Main Layer**: Dependency injection and app bootstrapping

## 🎨 Design Patterns

- **Factory Pattern**: For dependency injection
- **Repository Pattern**: For data access abstraction
- **Use Case Pattern**: For business logic encapsulation
- **Middleware Pattern**: For request processing
- **Dependency Injection**: For loose coupling

## ✅ SOLID Principles

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Interfaces are properly implemented
- **I**nterface Segregation: Specific interfaces instead of general ones
- **D**ependency Inversion: Depend on abstractions, not concretions

## 📝 License

MIT
