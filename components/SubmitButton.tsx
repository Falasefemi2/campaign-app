"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled size="lg">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button type="submit" className="w-40 h-10 px-2">
                    <span className="text-sm whitespace-normal text-center">Create Campaign</span>
                </Button>
            )}
        </>
    );
}