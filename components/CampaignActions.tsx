import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useTransition } from "react";
import { deleteCampaign } from "@/lib/action";

interface CampaignActionsProps {
    campaignId: string;
}

export function CampaignActions({ campaignId }: CampaignActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            await deleteCampaign(campaignId);
            router.refresh(); // Refresh the current route
        });
    };

    return (
        <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
    );
}