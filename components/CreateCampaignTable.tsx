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

export interface Campaign {
    id: string;
    userId: string;
    campaignName: string;
    campaignDescription: string | null;  // Allow null
    startDate: string;  // Changed from Date to string
    endDate: string;    // Changed from Date to string
    digestCampaign: boolean | null;  // Allow null
    linkedKeywords: unknown;  // Changed from string[] to unknown
    dailyDigest: string;
    createdAt: Date | null;  // Allow null
    updatedAt: Date | null;  // Allow null
}

interface CampaignsTableProps {
    campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignsTableProps) {
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
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Desktop view */}
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Button size="icon" variant="ghost">
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View</span>
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <Trash className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
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