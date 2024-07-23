"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "../_components/DatePicker";
import { useRef, useState } from "react";
import { createCampaign } from "@/lib/action";
import Link from "next/link";
import { CreationSubmit } from "@/components/SubmitButton";


export default function CampaignCreation() {
    const [linkedKeywords, setLinkedKeywords] = useState<string[]>([])
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();


    const keywordInputRef = useRef<HTMLTextAreaElement>(null)

    const handleKeywordChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newKeyword = e.currentTarget.value.trim()
            if (newKeyword) {
                setLinkedKeywords(prev => [...prev, newKeyword])
                e.currentTarget.value = ''
            }
        }
    }
    return (
        <section className="p-4 sm:p-6 md:p-10">
            <h1 className="text-primary font-bold text-xl mb-4">Create New Campaign</h1>
            <form action={async (formData) => {
                if (startDate) formData.set('startDate', startDate.toISOString());
                if (endDate) formData.set('endDate', endDate.toISOString());
                await createCampaign(formData);
            }} className="max-w-2xl space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input id="campaignName" name="campaignName" type="text" placeholder="e.g The Future now" className="w-full" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="campaignDescription">Campaign Description</Label>
                    <Textarea id="campaignDescription" name="campaignDescription" placeholder="Please add a description to your campaign" required />

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
                <div className="space-y-4 flex items-center justify-between">
                    <p>Want to receive daily digest about the campaign?</p>
                    <Switch id="digestCampaign" name="digestCampaign" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedKeywords">Linked Keywords</Label>
                    <Textarea
                        id="linkedKeywords"
                        ref={keywordInputRef}
                        placeholder="Type a keyword, type your keyword and press enter"
                        onKeyDown={handleKeywordChange}
                    />
                    {linkedKeywords.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Added keywords:</p>
                            <div className="flex flex-wrap gap-2">
                                {linkedKeywords.map((keyword, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <input
                        type="hidden"
                        name="linkedKeywords"
                        value={linkedKeywords.join(',')}
                    />

                </div>
                <div className="space-y-2">
                    <h2>Kindly select how often you want to receive daily digest</h2>
                    <Select name="dailyDigest" defaultValue="daily">
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
                <div className="mt-4 flex items-center gap-4">
                    <Button variant="outline" className="border-primary w-40 h-10 px-2">
                        <Link href="/">
                            <span className="text-sm whitespace-normal text-center">Cancel</span>
                        </Link>
                    </Button>
                    <CreationSubmit />
                </div>
            </form>
        </section>
    )
}


