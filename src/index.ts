// src/index.ts

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { config } from 'dotenv';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { bikerMeetups } from './schema';

config({ path: '.env' });
const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello, this is a service for BikeShip!');
});

app.get('/bikerMeetups', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const output = await db.select().from(bikerMeetups);
  return c.json(output);
});

app.get('/bikerMeetups/:bikerMeetupId', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const bikerMeetupId = c.req.param('bikerMeetupId');
  const output = await db
    .select()
    .from(bikerMeetups)
    .where(eq(bikerMeetups.id, Number(bikerMeetupId)));
  return c.json(output);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});