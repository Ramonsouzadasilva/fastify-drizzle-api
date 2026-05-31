// import {
//   pgTable,
//   pgEnum,
//   uuid,
//   text,
//   varchar,
//   timestamp,
//   numeric,
//   real,
// } from 'drizzle-orm/pg-core';

// /* =========================
//    ENUMS
// ========================= */

// export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'USER']);

// export const taskStatusEnum = pgEnum('task_status', [
//   'PENDENTE',
//   'EM_ANDAMENTO',
//   'CONCLUIDA',
//   'CANCELADA',
// ]);

// export const taskPriorityEnum = pgEnum('task_priority', [
//   'BAIXA',
//   'MEDIA',
//   'ALTA',
// ]);

// export const goalStatusEnum = pgEnum('goal_status', [
//   'PENDENTE',
//   'EM_ANDAMENTO',
//   'CONCLUIDA',
//   'CANCELADA',
// ]);

// export const transactionTypeEnum = pgEnum('transaction_type', [
//   'RECEITA',
//   'DESPESA',
// ]);

// export const transactionStatusEnum = pgEnum('transaction_status', [
//   'PENDENTE',
//   'CONFIRMADO',
//   'CANCELADO',
// ]);

// export const financialGoalStatusEnum = pgEnum('financial_goal_status', [
//   'PENDENTE',
//   'EM_ANDAMENTO',
//   'CONCLUIDA',
//   'CANCELADA',
// ]);

// /* =========================
//    USERS
// ========================= */

// export const users = pgTable('users', {
//   id: uuid('id').defaultRandom().primaryKey(),

//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull(),

//   role: userRoleEnum('role').notNull().default('USER'),

//   createdAt: timestamp('created_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp('updated_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });

// /* =========================
//    TASKS
// ========================= */

// export const tasks = pgTable('tasks', {
//   id: uuid('id').defaultRandom().primaryKey(),

//   title: text('title').notNull(),
//   description: text('description'),

//   inicio: timestamp('inicio', { withTimezone: true }).notNull(),
//   prazo: timestamp('prazo', { withTimezone: true }).notNull(),

//   status: taskStatusEnum('status').notNull().default('PENDENTE'),

//   prioridade: taskPriorityEnum('prioridade').notNull().default('MEDIA'),

//   userId: uuid('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),

//   createdAt: timestamp('created_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp('updated_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });

// /* =========================
//    GOALS
// ========================= */

// export const goals = pgTable('goals', {
//   id: uuid('id').defaultRandom().primaryKey(),

//   title: text('title').notNull(),
//   description: text('description'),

//   inicio: timestamp('inicio', { withTimezone: true }).notNull(),
//   prazo: timestamp('prazo', { withTimezone: true }).notNull(),

//   status: goalStatusEnum('status').notNull().default('PENDENTE'),

//   userId: uuid('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),

//   createdAt: timestamp('created_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp('updated_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });

// /* =========================
//    TRANSACTIONS
// ========================= */

// export const transactions = pgTable('transactions', {
//   id: uuid('id').defaultRandom().primaryKey(),

//   descricao: text('descricao').notNull(),

//   tipo: transactionTypeEnum('tipo').notNull(),

//   valor: real('valor').notNull(),

//   categoria: text('categoria').notNull(),

//   data: timestamp('data', { withTimezone: true }).notNull(),

//   status: transactionStatusEnum('status').notNull().default('CONFIRMADO'),

//   userId: uuid('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),

//   createdAt: timestamp('created_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp('updated_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });

// /* =========================
//    FINANCIAL GOALS
// ========================= */

// export const financialGoals = pgTable('financial_goals', {
//   id: uuid('id').defaultRandom().primaryKey(),

//   titulo: text('titulo').notNull(),
//   descricao: text('descricao'),

//   valorObjetivo: real('valor_objetivo').notNull(),

//   valorAtual: real('valor_atual').notNull().default(0),

//   inicio: timestamp('inicio', { withTimezone: true }).notNull(),
//   prazo: timestamp('prazo', { withTimezone: true }).notNull(),

//   status: financialGoalStatusEnum('status').notNull().default('PENDENTE'),

//   userId: uuid('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),

//   createdAt: timestamp('created_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//   updatedAt: timestamp('updated_at', { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });

import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  real,
  primaryKey,
} from 'drizzle-orm/pg-core';

/* =========================
   ENUMS
========================= */

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'USER']);

export const taskStatusEnum = pgEnum('task_status', [
  'PENDENTE',
  'EM_ANDAMENTO',
  'CONCLUIDA',
  'CANCELADA',
]);

export const taskPriorityEnum = pgEnum('task_priority', [
  'BAIXA',
  'MEDIA',
  'ALTA',
]);

export const goalStatusEnum = pgEnum('goal_status', [
  'PENDENTE',
  'EM_ANDAMENTO',
  'CONCLUIDA',
  'CANCELADA',
]);

export const transactionTypeEnum = pgEnum('transaction_type', [
  'RECEITA',
  'DESPESA',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'PENDENTE',
  'CONFIRMADO',
  'CANCELADO',
]);

export const financialGoalStatusEnum = pgEnum('financial_goal_status', [
  'PENDENTE',
  'EM_ANDAMENTO',
  'CONCLUIDA',
  'CANCELADA',
]);

/* =========================
   USERS
========================= */

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),

  role: userRoleEnum('role').notNull().default('USER'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* =========================
   TASKS
========================= */

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(),
  description: text('description'),

  inicio: timestamp('inicio', { withTimezone: true }).notNull(),
  prazo: timestamp('prazo', { withTimezone: true }).notNull(),

  status: taskStatusEnum('status').notNull().default('PENDENTE'),
  prioridade: taskPriorityEnum('prioridade').notNull().default('MEDIA'),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* =========================
   GOALS
========================= */

export const goals = pgTable('goals', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(),
  description: text('description'),

  inicio: timestamp('inicio', { withTimezone: true }).notNull(),
  prazo: timestamp('prazo', { withTimezone: true }).notNull(),

  status: goalStatusEnum('status').notNull().default('PENDENTE'),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* =========================
   TASK ↔ GOAL (M:N)
========================= */

export const taskGoals = pgTable(
  'task_goals',
  {
    taskId: uuid('task_id')
      .notNull()
      .references(() => tasks.id, { onDelete: 'cascade' }),

    goalId: uuid('goal_id')
      .notNull()
      .references(() => goals.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey(t.taskId, t.goalId),
  }),
);

/* =========================
   TRANSACTIONS
========================= */

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),

  descricao: text('descricao').notNull(),
  tipo: transactionTypeEnum('tipo').notNull(),

  valor: real('valor').notNull(),
  categoria: text('categoria').notNull(),

  data: timestamp('data', { withTimezone: true }).notNull(),

  status: transactionStatusEnum('status').notNull().default('CONFIRMADO'),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* =========================
   FINANCIAL GOALS
========================= */

export const financialGoals = pgTable('financial_goals', {
  id: uuid('id').defaultRandom().primaryKey(),

  titulo: text('titulo').notNull(),
  descricao: text('descricao'),

  valorObjetivo: real('valor_objetivo').notNull(),
  valorAtual: real('valor_atual').notNull().default(0),

  inicio: timestamp('inicio', { withTimezone: true }).notNull(),
  prazo: timestamp('prazo', { withTimezone: true }).notNull(),

  status: financialGoalStatusEnum('status').notNull().default('PENDENTE'),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* =========================
   TRANSACTION ↔ FINANCIAL GOAL (M:N)
========================= */

export const financialGoalTransactions = pgTable(
  'financial_goal_transactions',
  {
    financialGoalId: uuid('financial_goal_id')
      .notNull()
      .references(() => financialGoals.id, { onDelete: 'cascade' }),

    transactionId: uuid('transaction_id')
      .notNull()
      .references(() => transactions.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey(t.financialGoalId, t.transactionId),
  }),
);
