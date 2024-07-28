"use client";

import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, Pencil, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignActions } from "./CampaignActions";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { deleteCampaign } from "@/lib/action";
import { useFormStatus } from "react-dom";
import { Heart, Loader2 } from "lucide-react";


export interface Campaign {
    id: string;
    userId: string;
    campaignName: string;
    campaignDescription: string | null;  // Allow null
    startDate: string;  // Changed from Date to string
    endDate: string;    // Changed from Date to string
    digestCampaign: boolean | null;  // Allow null
    linkedKeywords: string[] | unknown;
    dailyDigest: string;
    createdAt: Date | null;  // Allow null
    updatedAt: Date | null;  // Allow null
}

interface CampaignsTableProps {
    campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignsTableProps) {
    const { userId } = useAuth();

    return (
        <Card className="mt-10">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span>S/N</span>
                            </TableHead>
                            <TableHead>Campaign Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead className="md:table-cell">Status</TableHead>
                            <TableHead className="md:table-cell">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign, index) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="hidden sm:table-cell">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {campaign.campaignName}
                                </TableCell>
                                <TableCell>
                                    {new Date(campaign.startDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={campaign.digestCampaign ? "default" : "destructive"}>
                                        {campaign.digestCampaign ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {/* Mobile view */}
                                    <div className="sm:hidden">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View</DropdownMenuItem>
                                                <Link href={`/campaign/${campaign.id}/edit`}>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                </Link>
                                                <CampaignActions campaignId={campaign.id} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Desktop view */}
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Button size="icon" variant="ghost">
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View</span>
                                        </Button>
                                        <Link href={`/campaign/${campaign.id}/edit`}>
                                            <Button size="icon" variant="ghost">
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                                {/* <Pencil className="h-4 w-4" />
                                            <Link href={`/campaign/${userId}/edit`}>
                                                <span className="sr-only">Edit</span>
                                            </Link> */}
                                            </Button>
                                        </Link>
                                        <DeleteCampaignButton
                                            campaignId={campaign.id}
                                            campaignName={campaign.campaignName}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
    )
}


interface DeleteCampaignButtonProps {
    campaignId: string;
    campaignName: string;
}

function DeleteCampaignButton({ campaignId, campaignName }: DeleteCampaignButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        startTransition(async () => {
            await deleteCampaign(campaignId);
            router.refresh();
            setIsModalOpen(false);
        });
    };

    return (
        <>
            <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                disabled={isPending}
            >
                <Trash className="h-4 w-4" />
                <span className="sr-only">{isPending ? "Deleting..." : "Delete"}</span>
            </Button>
            <DeleteCampaignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                campaignName={campaignName}
                isPending={isPending}
            />
        </>

    );
}




import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

interface DeleteCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    campaignName: string;
    isPending: boolean;

}

function DeleteCampaignModal({ isOpen, onClose, onConfirm, campaignName, isPending }: DeleteCampaignModalProps) {
    const { pending } = useFormStatus();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex items-center justify-center flex-col">
                <DialogHeader>
                    <DialogTitle className="text-center mb-14">Stop Campaign</DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete {campaignName} campaign?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start mt-10">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    {isPending ? (
                        <Button disabled variant="destructive">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button type="button" variant="destructive" onClick={onConfirm}>
                            <span className="text-sm whitespace-normal text-center">Delete Campaign</span>
                        </Button>
                    )}

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}




