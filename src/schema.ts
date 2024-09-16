// src/schema.ts

import { pgTable, integer, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const bikerMeetups = pgTable('bikerMeetups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  desc: text('desc'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  createdBy: text('created_by'),
  xValue: integer('x_value').notNull(),
  yValue: integer('y_value').notNull(),
});
