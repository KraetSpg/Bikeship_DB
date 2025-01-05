import { doublePrecision, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// BIKERMEETUP
export const bikerMeetups = pgTable('bikerMeetups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  desc: text('desc'),
  date: text('date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  createdBy: text('created_by'),
  xValue: doublePrecision('x_value').notNull(),
  yValue: doublePrecision('y_value').notNull(),
});


// USER
export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  state: text('state'),
  country: text('country'),
  age: text('age'),
  userDesc: text('userDesc'),
  bike: serial('bike').references(() => bike.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});


// BIKE
export const bike = pgTable('bike', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  bike_make: text('bike_make'),
  bike_model: text('bike_model'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

