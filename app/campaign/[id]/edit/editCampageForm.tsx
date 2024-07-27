"use client";



import { Campaign } from "@/components/CreateCampaignTable";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { editCampaign } from "@/lib/action";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCampaignForm({ campaign }: { campaign: Campaign }) {
    const router = useRouter();
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            await editCampaign(campaign.id, formData);
            router.push("/campaign");
            router.refresh();
        } catch (error) {
            console.error("Failed to edit campaign:", error);
            // Handle error (e.g., show error message to user)
        }
    }

    return (
        <section className="p-4 sm:p-6 md:p-10">
            <Link href="/campaign" className="flex items-center gap-1">
                <ArrowBigLeft /> <span>Back</span>
            </Link>
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 mt-6">
                <div className="flex items-center justify-between">
                    <h1>Campaign Information</h1>
                    <div>
                        <Button type="button">Campaign Status</Button>
                        <Button type="button" variant="outline" className="ml-2">
                            {campaign.digestCampaign ? "Active" : "Inactive"}
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                        id="campaignName"
                        name="campaignName"
                        type="text"
                        defaultValue={campaign.campaignName}
                        className="w-full"
                        required
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col w-full sm:w-1/2">
                        <Label htmlFor="startDate" className="mb-2">Start Date</Label>
                        <DatePicker
                            name="startDate"
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                        <Label htmlFor="endDate" className="mb-2">End Date</Label>
                        <DatePicker
                            name="endDate"
                            onChange={(date) => setEndDate(date)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedKeywords">Linked Words</Label>
                    <Textarea
                        id="linkedKeywords"
                        name="linkedKeywords"
                    // defaultValue={campaign.linkedKeywords.join(", ")} 
                    />
                </div>
                <div className="space-y-2">
                    <h2>Want to receive daily digest about the campaign?</h2>
                    <Select name="digestCampaign" defaultValue={campaign.digestCampaign ? "yes" : "no"}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <h2>Kindly select the time you want to receive daily digest?</h2>
                    <Select name="dailyDigest" defaultValue={campaign.dailyDigest}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-8 flex items-center gap-4">
                    <Button type="button" variant="destructive" className="w-40 h-10 px-2">
                        <Link href="/campaign">
                            <span className="text-sm whitespace-normal text-center">Cancel</span>
                        </Link>
                    </Button>
                    <Button type="submit" variant="outline" className="w-40 h-10 px-2">
                        Edit Campaign
                    </Button>
                </div>
            </form>
        </section>

    );
}

