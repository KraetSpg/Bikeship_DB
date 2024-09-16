CREATE TABLE IF NOT EXISTS "bikerMeetups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"x_value" integer NOT NULL,
	"y_value" integer NOT NULL
);
--> statement-breakpoint