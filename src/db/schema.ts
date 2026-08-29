import { text, pgTable, pgEnum, boolean} from "drizzle-orm/pg-core";

export const RoleType = pgEnum("user_role",["PRODUCER","FINANCE","EDITOR","CREATOR"])
export const StatusType = pgEnum("status",["PENDING","APPROVED","REJECTED","CANCELLED"])

export const Members = pgTable("members", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: RoleType("role").default("PRODUCER").notNull(),
  active: boolean().notNull().default(true),
});


export const RoleChangeRequests = pgTable("role_change_requests",{
  id: text('id').primaryKey(),
  requester_id: text('requester_id').notNull(),
  target_id: text('target_id').notNull().references(()=> Members.id),
  new_role:RoleType("role").notNull(),
  status: StatusType("status").default("PENDING").notNull(),
})
export const Decisions = pgTable("decisions",{
      request_id: text('request_id').notNull().references(()=> RoleChangeRequests.id),
      member_id: text('member_id').notNull().references(()=> Members.id),
      result: StatusType("status").default("PENDING").notNull(),
})


export type Member = typeof Members.$inferSelect;       
export type NewMember = typeof Members.$inferInsert;  
export type RoleChangeRequest = typeof RoleChangeRequests.$inferSelect;
export type NewRoleChangeRequest = typeof RoleChangeRequests.$inferInsert;