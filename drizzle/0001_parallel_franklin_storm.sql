ALTER TABLE "classes" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "capacity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "level" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "min_age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "max_age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "code" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "is_elective" boolean DEFAULT false NOT NULL;