// src/seed.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { bikerMeetups } from './schema';
import { config } from 'dotenv';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  await db.insert(bikerMeetups).values([
    {
      name: 'Biker Meetup 1',
      desc: 'First biker meetup',
      xValue: 1,
      yValue: 2,
      createdBy: 'Alice'
    },
    {
      name: 'Biker Meetup 2',
      desc: 'Second biker meetup',
      xValue: 3,
      yValue: 4,
      createdBy: 'Bob'
    },
    {
      name: 'Biker Meetup 3',
      desc: 'Third biker meetup',
      xValue: 5,
      yValue: 6,
      createdBy: 'Charlie'
    }
  ]);
}

async function main() {
  try {
    await seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

main();