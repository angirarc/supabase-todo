"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import useNote from "@/hooks/use-note";
import { updateNoteAction } from "@/actions/notes";
import { useToast } from "@/hooks/use-toast";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const { toast } = useToast();
  const { noteText, setNoteText } = useNote();
  const noteIdParam = useSearchParams().get("noteId") || "";

  const updateNote = async (text: string) => {
    const { errorMessage } = await updateNoteAction(noteId, text);
    if (!errorMessage) {
      toast({
        title: "Success",
        description: "Note updated successfully",
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNote(text);
    }, 1000);
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your notes here.."
      className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
