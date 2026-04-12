"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { notes } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function sayHello() {
    console.log("hello world from server")
}

export type ActionState = {
    message: string;
    error?: boolean;
} | null;

export async function addNote(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    if (!title || !content) {
        return { message: "Title and content are required.", error: true };
    }

    try {
        await db.insert(notes).values({
            title,
            content
        });
        revalidatePath("/");
        return { message: "Note added successfully!" };
    } catch (e) {
        return { message: "Failed to add note.", error: true };
    }
}

export async function getNotes() {
    const noteList = await db.select().from(notes);
    return noteList;
}

export async function deleteNote(id: string) {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        revalidatePath("/");
    } catch (e) {
        console.error("Failed to delete note:", e);
    }
}