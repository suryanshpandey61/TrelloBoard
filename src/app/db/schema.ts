import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  password: text('password').notNull(), // simple password for now
})

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  columnId: text('column_id').notNull(), // 'todo' | 'doing' | 'done'
})
