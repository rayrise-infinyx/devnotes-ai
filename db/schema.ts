import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});