import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";

export function CampaignButton() {
    const { userId } = useAuth();

    return (
        <>
            {userId && (
                <Link href={`/campaign/${userId}/create`}>
                    <Button className="mt-4 w-full">New Campaign</Button>
                </Link>
            )}
        </>
    );
}