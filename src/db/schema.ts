import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  uuid,
  date,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const grades = pgTable('grades', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  level: integer('level').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  minAge: integer('min_age').notNull(),
  maxAge: integer('max_age').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  gradeId: uuid('grade_id').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  capacity: integer('capacity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  gradeId: uuid('grade_id').notNull(),
  code: varchar('code', { length: 50 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isElective: boolean('is_elective').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const classRelations = relations(classes, ({ one, many }) => ({
  grades: one(grades, { fields: [classes.gradeId], references: [grades.id] }),
  subjects: many(subjects),
}));

export const gradeRelations = relations(grades, ({ many }) => ({
  classes: many(classes),
}));

export const subjectRelations = relations(subjects, ({ one, many }) => ({ 
  grade: one(grades, { fields: [subjects.gradeId], references: [grades.id] }),
}));

export type Grade = typeof grades.$inferSelect;
export type NewGrade = typeof grades.$inferInsert;
export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;