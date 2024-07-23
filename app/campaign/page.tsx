import CampaignTable from "@/components/CreateCampaignTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAllCampaigns } from "@/lib/action";
import { Eye, Pencil, Search, Trash } from "lucide-react";

export default async function CampaignPage() {
    const campaigns = await fetchAllCampaigns();
    console.log(campaigns);


    return (
        <main className="p-4 sm:p-6 md:p-10">
            <h1 className="text-primary font-bold text-xl mb-4">All Campaigns</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full space-y-4 sm:space-y-0">
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="border-primary text-primary">All (90)</Button>
                    <Button variant="outline" className="border-primary text-primary">Inactive (90)</Button>
                    <Button variant="outline" className="border-primary text-primary">Active (90)</Button>
                </div>
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full appearance-none bg-background pl-8 shadow-none"
                    />
                </div>
            </div>
            <CampaignTable campaigns={campaigns} />
        </main>
    )
}










