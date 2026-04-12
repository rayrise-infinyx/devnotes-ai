"use server"

import { db } from "@/db/index"
import { notes } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function  sayHello(){
    console.log("hello world from server")
}

export async function addNote(formData : FormData){
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    
    await db.insert(notes).values({
        title,
        content
    })
}

export async function getNotes(){
    const noteList = await db.select().from(notes)
    return noteList
}

export async function deleteNote(id: string){
    await db.delete(notes).where(eq(notes.id, id))
}