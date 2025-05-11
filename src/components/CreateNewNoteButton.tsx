"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useNote from "@/hooks/use-note";

function CreateNewNoteButton() {
    const router = useRouter();
    const { setNoteText } = useNote();

    const clearNoteText = () => {
        setNoteText("")
        router.push("/");
    };

    return (
        <Button
            onClick={clearNoteText}
            variant="secondary"
            className="w-32"
        >
            Create New Note
        </Button>
    );
}

export default CreateNewNoteButton;