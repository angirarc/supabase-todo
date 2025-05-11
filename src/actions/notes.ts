'use server';

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const createNoteAction = async (text: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in create update a note");

        const note = await prisma.note.create({
            data: {
                text,
                authorId: user.id
            }
        });

        return { errorMessage: null, data: note }
    } catch (err) {
        return handleError(err)
    }
}

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");

        await prisma.note.update({
            where: {
                id: noteId,
                // authorId: user.id
            },
            data: {
                text
            }
        });

        return { errorMessage: null }
    } catch (err) {
        return handleError(err)
    }
}

export const deleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");

        await prisma.note.delete({
            where: {
                id: noteId,
                // authorId: user.id
            },
        });
        
        return { errorMessage: null }
    } catch (err) {
        return handleError(err)
    }
}