import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import HomeToast from "@/components/HomeToast";
import { prisma } from "@/db/prisma";
import CreateNewNoteButton from "@/components/CreateNewNoteButton";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        {noteId &&
          <>
            <AskAIButton user={user} />
            <CreateNewNoteButton />
            </>
        }
        {!noteId && <NewNoteButton user={user} />}
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />

      <HomeToast />
    </div>
  );
}

export default HomePage;