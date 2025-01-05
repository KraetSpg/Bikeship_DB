// src/seed.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { bike, bikerMeetups, user } from './schema';
import { config } from 'dotenv';
import { Console } from 'console';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seedMeetUps() {
  console.log("Seeding meetups");
  await db.insert(bikerMeetups).values([
    {
      date: '2021-10-10',
      name: 'Biker Meetup 1',
      desc: 'This is the first biker meetup',
      xValue: 1736541.08931579,
      yValue: 6140344.7487792,
    },
    {
      date: '2021-10-10',
      name: 'Biker Meetup 2',
      desc: 'This is the second biker meetup',
      xValue: 1966850.12067486,
      yValue: 6226621.85010209,
    },
    {
      date: '2021-10-10',
      name: 'Biker Meetup 3',
      desc: 'This is the third biker meetup',
      xValue: 1965798.83763431,
      yValue: 6164196.25058138,
    },
    {
      date: '2021-10-10',
      name: 'Biker Meetup 4',
      desc: 'This is the fourth biker meetup',
      xValue: 1767834.90293655,
      yValue: 6160086.09699004,
    },
    {
      date: '2021-10-10',
      name: 'Biker Meetup 5',
      desc: 'This is the fifth biker meetup',
      xValue: 1899585.53578477,
      yValue: 6217296.53264649,
    },
  ]);
}

async function seedUserAndBikes() {
  console.log("Seeding users and bikes");
  await db.insert(bike).values([
    {
      name: 'Yamaha YZF-R1',
      bike_make: 'Yamaha',
      bike_model: 'YZF-R1',
    },
    {
      name: 'Honda CBR600RR',
      bike_make: 'Honda',
      bike_model: 'CBR600RR',
    },
    {
      name: 'Kawasaki Ninja ZX-10R',
      bike_make: 'Kawasaki',
      bike_model: 'Ninja ZX-10R',
    },
    {
      name: 'Suzuki GSX-R750',
      bike_make: 'Suzuki',
      bike_model: 'GSX-R750',
    },
    {
      name: 'Ducati Panigale V4',
      bike_make: 'Ducati',
      bike_model: 'Panigale V4',
    },
  ]);

  const bikeIDS = await db.select().from(bike);

  if (bikeIDS.length < 4) {
    console.log(bikeIDS.length);
    throw new Error('No bikes found');
  }
  
  await db.insert(user).values([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      bike: Number(bikeIDS[0].id),
      userDesc: 'I love riding my bike'
    },
    {
      name: 'Jahn Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      bike: Number(bikeIDS[1].id),
      userDesc: 'I love riding my bike'
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      password: 'password123',
      bike: Number(bikeIDS[2].id),
      userDesc: 'I love riding my bike'
    },
    {
      name: 'Emily Jones',
      email: 'emily.jones@example.com',
      password: 'password123',
      bike: Number(bikeIDS[3].id),
      userDesc: 'I love riding my bike'
    },
    {
      name: 'William Johnson',
      email: 'william.johnson@example.com',
      password: 'password123',
      bike: Number(bikeIDS[4].id),
      userDesc: 'I love riding my bike'
    }
  ]);
}

async function main() {
  try {
    await seedMeetUps();
    await seedUserAndBikes();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

main();