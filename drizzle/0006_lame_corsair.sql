ALTER TABLE "bike" RENAME COLUMN "desc" TO "bike_make";--> statement-breakpoint
ALTER TABLE "bike" ADD COLUMN "bike_model" text;