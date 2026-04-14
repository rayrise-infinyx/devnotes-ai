"use server"



import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { notes, noteTags, tags } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"


export async function sayHello() {
    console.log("hello world from server")
}

export type ActionState = {
    message: string;
    error?: boolean;
} | null;




export async function addNote(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsString = formData.get("tags") as string;

  const { userId } = await auth();

  if (!userId) {
    return { message: "You must be logged in to add a note.", error: true };
  }

  if (!title || !content) {
    return { message: "Title and content are required.", error: true };
  }

  let tagNames: string[] = [];
  if (tagsString) {
    // split, trim, filter empty 
    tagNames = [...new Set(tagsString.split(",").map(t => t.trim()).filter(Boolean))];
  }

  try {
    // 1. Insert note
    const insertedNote = await db.insert(notes).values({
      userId,
      title,
      content,
    }).returning({ id: notes.id });

    const newNoteId = insertedNote[0].id;

    // 2. Process and map tags
    if (tagNames.length > 0) {
      for (const tName of tagNames) {
        let tagId: string;
        
        // Find existing tag by exact match (case-insensitive)
        const existingTags = await db.select().from(tags).where(ilike(tags.name, tName));
        
        if (existingTags.length > 0) {
          tagId = existingTags[0].id;
        } else {
          // Create new tag
          const insertedTag = await db.insert(tags).values({ name: tName }).returning({ id: tags.id });
          tagId = insertedTag[0].id;
        }

        // Link note & tag
        await db.insert(noteTags).values({
          noteId: newNoteId,
          tagId: tagId,
        });
      }
    }

    revalidatePath("/");

    return { message: "Note added successfully!", error: false };
  } catch (e) {
    console.error("Failed to add note:", e);
    return { message: "Failed to add note.", error: true };
  }
}

export async function getFilteredNotes(query?: string, tagId?: string) {
  const { userId } = await auth();
  if (!userId) return [];

  const conditions = [eq(notes.userId, userId)];
  
  if (query) {
    conditions.push(ilike(notes.title, `%${query}%`));
  }

  if (tagId && tagId !== "all") {
    conditions.push(eq(noteTags.tagId, tagId));
    return await db.select({
      id: notes.id,
      userId: notes.userId,
      title: notes.title,
      content: notes.content,
      createdAt: notes.createdAt,
    })
    .from(notes)
    .innerJoin(noteTags, eq(notes.id, noteTags.noteId))
    .where(and(...conditions));
  } else {
    return await db.select()
    .from(notes)
    .where(and(...conditions));
  }
}

export async function getAllTags() {
  return await db.select().from(tags);
}

export async function deleteNote(id: string) {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        revalidatePath("/");
    } catch (e) {
        console.error("Failed to delete note:", e);
    }
}