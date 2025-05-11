"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

function LogOutButton() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!errorMessage) {
      router.push("/");
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
