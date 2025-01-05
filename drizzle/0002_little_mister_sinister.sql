ALTER TABLE "bikerMeetups" ALTER COLUMN "x_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "bikerMeetups" ALTER COLUMN "x_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bikerMeetups" ALTER COLUMN "y_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "bikerMeetups" ALTER COLUMN "y_value" DROP NOT NULL;