export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Clean Architecture API",
    version: "1.0.0",
    description: "Complete RESTful API with Clean Architecture, SOLID principles, and comprehensive features",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          message: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["ADMIN", "USER"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          inicio: { type: "string", format: "date-time" },
          prazo: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"] },
          prioridade: { type: "string", enum: ["BAIXA", "MEDIA", "ALTA"] },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Goal: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          inicio: { type: "string", format: "date-time" },
          prazo: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"] },
          userId: { type: "string", format: "uuid" },
          tarefasCompletadas: { type: "number" },
          tarefasTotal: { type: "number" },
          tarefasPercentual: { type: "number" },
          tarefasRestantes: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Transaction: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          descricao: { type: "string" },
          tipo: { type: "string", enum: ["RECEITA", "DESPESA"] },
          valor: { type: "number" },
          categoria: { type: "string" },
          data: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PENDENTE", "CONFIRMADO", "CANCELADO"] },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      FinancialGoal: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          titulo: { type: "string" },
          descricao: { type: "string" },
          valorObjetivo: { type: "number" },
          valorAtual: { type: "number" },
          percentualConcluido: { type: "number" },
          valorRestante: { type: "number" },
          inicio: { type: "string", format: "date-time" },
          prazo: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"] },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", minLength: 3 },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                  role: { type: "string", enum: ["ADMIN", "USER"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User created successfully" },
          400: { description: "Validation error" },
          409: { description: "Email already in use" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "Get all tasks (paginated)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: {
          200: { description: "Tasks retrieved successfully" },
          401: { description: "Unauthorized" },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create a new task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "inicio", "prazo"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  inicio: { type: "string", format: "date-time" },
                  prazo: { type: "string", format: "date-time" },
                  status: { type: "string", enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"] },
                  prioridade: { type: "string", enum: ["BAIXA", "MEDIA", "ALTA"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Task created successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get task by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Task retrieved successfully" },
          404: { description: "Task not found" },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update task",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Task updated successfully" },
          404: { description: "Task not found" },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete task",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          204: { description: "Task deleted successfully" },
          404: { description: "Task not found" },
        },
      },
    },
    "/goals": {
      get: {
        tags: ["Goals"],
        summary: "Get all goals with statistics",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: {
          200: { description: "Goals retrieved successfully" },
        },
      },
      post: {
        tags: ["Goals"],
        summary: "Create a new goal",
        security: [{ bearerAuth: [] }],
        responses: {
          201: { description: "Goal created successfully" },
        },
      },
    },
    "/goals/stats": {
      get: {
        tags: ["Goals"],
        summary: "Get goals statistics",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Statistics retrieved successfully" },
        },
      },
    },
    "/goals/{id}/tasks": {
      post: {
        tags: ["Goals"],
        summary: "Add task to goal",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Task added successfully" },
        },
      },
      delete: {
        tags: ["Goals"],
        summary: "Remove task from goal",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Task removed successfully" },
        },
      },
    },
    "/transactions": {
      get: {
        tags: ["Transactions"],
        summary: "Get all transactions",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: {
          200: { description: "Transactions retrieved successfully" },
        },
      },
      post: {
        tags: ["Transactions"],
        summary: "Create a new transaction",
        security: [{ bearerAuth: [] }],
        responses: {
          201: { description: "Transaction created successfully" },
        },
      },
    },
    "/financial-goals": {
      get: {
        tags: ["Financial Goals"],
        summary: "Get all financial goals",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: {
          200: { description: "Financial goals retrieved successfully" },
        },
      },
      post: {
        tags: ["Financial Goals"],
        summary: "Create a new financial goal",
        security: [{ bearerAuth: [] }],
        responses: {
          201: { description: "Financial goal created successfully" },
        },
      },
    },
    "/financial-goals/stats": {
      get: {
        tags: ["Financial Goals"],
        summary: "Get financial goals statistics",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Statistics retrieved successfully" },
        },
      },
    },
    "/financial-goals/{id}/transactions": {
      post: {
        tags: ["Financial Goals"],
        summary: "Add transaction to financial goal",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Transaction added successfully" },
        },
      },
      delete: {
        tags: ["Financial Goals"],
        summary: "Remove transaction from financial goal",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Transaction removed successfully" },
        },
      },
    },
  },
}
