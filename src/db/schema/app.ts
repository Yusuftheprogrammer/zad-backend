import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().$onUpdate(() => new Date()).notNull()
}

const genderEnum = pgEnum("gender", ["male", "female"])

export const classes = pgTable("classes", {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).notNull(),
    gradeId: varchar("grade_id").notNull().references(() => grades.id, { onDelete: "cascade" }),
    ...timestamps
});

export const grades = pgTable("grades", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: uuid("name").notNull(),
    ...timestamps
});

export const divisions = pgTable("divisions", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: uuid("name").notNull(),
    ...timestamps
});

export const subjects = pgTable("subjects", {
    id: uuid("id").defaultRandom().primaryKey(),
    gradeId: varchar("grade_id").notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    ...timestamps
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 400 }).notNull(),
    email: varchar("email", { length: 450 }).notNull().unique(),
    password: varchar("password").notNull(),
    gender: genderEnum("gender").notNull(),
    ...timestamps
});


export const students = pgTable("students", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    classId: uuid("class_id").notNull().references(() => classes.id),
    gradeId: uuid("grade_id").notNull().references(() => grades.id),
    ...timestamps
});


export const teachers = pgTable("teachers", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ...timestamps
});

export const student_subjects = pgTable("student_subjects", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
    subjectId: uuid("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
    ...timestamps
});

export const teacher_subjects = pgTable("teacher_subjects", {
    id: uuid("id").primaryKey().defaultRandom(),
    teacherId: uuid("teacher_id").notNull().references(() => teachers.id, { onDelete: "cascade" }),
    subjectId: uuid("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
    ...timestamps
});

export const teacher_classes = pgTable("teacher_classes", {
    id: uuid("id").primaryKey().defaultRandom(),
    teacherId: uuid("teacher_id").notNull().references(() => teachers.id, { onDelete: "cascade" }),
    classId: uuid("class_id").notNull().references(() => classes.id, { onDelete: "cascade" }),
    ...timestamps
});

export const teacher_grades = pgTable("teacher_grades", {
    id: uuid("id").primaryKey().defaultRandom(),
    teacherId: uuid("teacher_id").notNull().references(() => teachers.id, { onDelete: "cascade" }),
    gradeId: uuid("grade_id").notNull().references(() => grades.id, { onDelete: "cascade" }),
    ...timestamps
});

