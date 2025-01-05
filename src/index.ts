// src/index.ts

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { config } from 'dotenv';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { bikerMeetups, user } from './schema';
import { cors } from 'hono/cors'
import { boolean } from 'drizzle-orm/mysql-core';

import { BikerMeetup } from './interfaces/bikermeetup';

const  DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://bikeshipdb_owner:sWvDSoqzM87U@ep-bitter-pond-a2pm89zh.eu-central-1.aws.neon.tech/bikeshipdb?sslmode=require";
const sql = neon(DATABASE_URL);
const table = bikerMeetups;
const db = drizzle(sql);

config({ path: '.env' });
const app = new Hono();

/* 
-------------------

CORS

------------------- 
*/

app.use(
  '/api/*',
  cors({
    // Origin ist die Origin der Anfrage an den Server
    origin: 'http://localhost:4200',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'content-type'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)


/* 
-------------------

BIKERMEETUPS

------------------- 
*/


app.post('/api/bikermeetups', async (c) => {
  const body = await c.req.text()

  if (!checkbody(JSON.parse(body))) {
    console.log('Invalid body');
    return c.text('Invalid body');
  }

  return c.text(JSON.stringify(body));
});

app.get('/', (c) => {
  return c.text('Hello, this is a service for BikeShip!');
});

app.get('/api/bikermeetups', async (c) => {
  const output = await db.select().from(bikerMeetups);
  return c.json(output);
});

app.get('/bikerMeetups/:bikerMeetupId', async (c) => {
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

function checkbody(obj: Object): boolean {
  try {
    const bikerMeetup = obj as BikerMeetup;
    if (
      bikerMeetup.name &&
      bikerMeetup.date &&
      bikerMeetup.desc &&
      bikerMeetup.xValue &&
      bikerMeetup.yValue &&
      bikerMeetup.createdAt &&
      bikerMeetup.createdBy
    ) {
      return true;
    } 
  } catch (error) {
    return false;
  }
  return false;
}


/* 
-------------------

USER

------------------- 
*/

app.get('/api/user', async (c) => {
  const response = await db.select().from(user);
  return c.json(response ?? []);
});

app.get('/api/users/:userID', async (c) => {
  const bikerMeetupId = c.req.param('userID');
  const userFound = await db
    .select()
    .from(user)
    .where(eq(user.id, Number(bikerMeetupId)));
  return c.json(userFound ?? []);
});