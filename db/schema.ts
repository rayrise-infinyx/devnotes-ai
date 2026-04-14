import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tags = pgTable("tags",{
  id: uuid("id").defaultRandom().primaryKey(),
  name : text("name").notNull(),

})

export const noteTags = pgTable("note_tags",{
  id : uuid().defaultRandom().primaryKey(),
  noteId : uuid("note_id").references(()=>notes.id).notNull(),
  tagId : uuid("tag_id").references(()=>tags.id).notNull(),

})