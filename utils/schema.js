import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),
    avatarName: varchar('avatarName').default('Interview Mitra'),
    interviewDuration: varchar('interviewDuration').default('30'),
})
export const UserAnswer = pgTable('userAnswer', {
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createadAt'),
})

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    name: varchar('name').notNull(),
    imageUrl: varchar('imageUrl'),
    createdAt: varchar('createdAt').notNull(),
    lastLoginAt: varchar('lastLoginAt').notNull(),
})