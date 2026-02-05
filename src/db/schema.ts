import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  uuid,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

const gradeEnum = pgEnum('grade', ['أول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'ثاني بكالوريا', 'ثالث بكالوريا']);
const divisionEnum = pgEnum('division', ['علمي علوم', 'أدبي', 'علمي رياضيات', 'طب', 'هندسة', 'أداب', 'أعمال']);
const assessmentEnum = pgEnum('type', ['homework', 'exam'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: text('password_hash').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  class_id: uuid('class_id').notNull().references(() => classes.id), 
  grade: gradeEnum('grade').notNull(),
  division: divisionEnum('division').notNull(),
  birth_date: date('birth_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const teachers = pgTable('teachers', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  subject: varchar('subject', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  grade: gradeEnum('grade').notNull(),
  teacherId: uuid('teacher_id').notNull().references(() => teachers.id),
  division: divisionEnum('division').notNull(),
  code: varchar('code').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 200 }).notNull(),
  grade: gradeEnum('grade').notNull(),
  division: divisionEnum('division').notNull()
});

export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: assessmentEnum('type').notNull(),
  class_id: uuid('class_id').notNull().references(() => classes.id),
  title: varchar('title', { length: 255 }).notNull(),
  assessmentDate: date('assessment_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  exam_id: uuid('exam_id').notNull().references(() => assessments.id),
  title: text('title').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  question_id: uuid('question_id').notNull().references(() => questions.id),
  text: text('text').notNull(),
  is_correct: boolean('is_correct').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const studentExamAnswers = pgTable('student_exam_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  student_id: uuid('student_id').notNull().references(() => students.id),
  question_id: uuid('question_id').notNull().references(() => questions.id),
  answer_id: uuid('answer_id').notNull().references(() => answers.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const homeworks = pgTable('homeworks', {
  id: uuid('id').primaryKey().defaultRandom(),
  class_id: uuid('class_id').notNull().references(() => classes.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  due_date: date('due_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});