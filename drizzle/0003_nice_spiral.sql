ALTER TABLE "bikerMeetups" ALTER COLUMN "x_value" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bikerMeetups" ALTER COLUMN "y_value" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bikerMeetups" ADD COLUMN "date" text NOT NULL;