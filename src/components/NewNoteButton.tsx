"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";
import { useToast } from "@/hooks/use-toast";
import useNote from "@/hooks/use-note";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { noteText } = useNote();

  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const { errorMessage, data } = await createNoteAction(noteText);

      if (!errorMessage) {
        toast({
          title: "Success",
          description: "Note created successfully",
          variant: "success",
        });
        router.push(`/?noteId=${data?.id}`);
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }

      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Save Note"}
    </Button>
  );
}

export default NewNoteButton;
