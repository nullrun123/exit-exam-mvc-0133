CREATE TYPE "user_role" AS ENUM('PRODUCER', 'FINANCE', 'EDITOR', 'CREATOR');--> statement-breakpoint
CREATE TYPE "status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "decisions" (
	"request_id" text NOT NULL,
	"member_id" text NOT NULL,
	"status" "status" DEFAULT 'PENDING'::"status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"role" "user_role" DEFAULT 'PRODUCER'::"user_role" NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_change_requests" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"target_id" text NOT NULL,
	"status" "status" DEFAULT 'PENDING'::"status" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "decisions" ADD CONSTRAINT "decisions_request_id_role_change_requests_id_fkey" FOREIGN KEY ("request_id") REFERENCES "role_change_requests"("id");--> statement-breakpoint
ALTER TABLE "decisions" ADD CONSTRAINT "decisions_member_id_members_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id");--> statement-breakpoint
ALTER TABLE "role_change_requests" ADD CONSTRAINT "role_change_requests_target_id_members_id_fkey" FOREIGN KEY ("target_id") REFERENCES "members"("id");