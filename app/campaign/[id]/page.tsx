import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CampaignCreation() {
    return (
        <section className="p-4 sm:p-6 md:p-10">
            <h1 className="text-primary font-bold text-xl mb-4">Create New Campaign</h1>
            <form className="max-w-2xl space-y-4">
                <Input type="text" placeholder="e.g The Future now" className="w-full" />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input type="date" placeholder="dd/mm/yy" className="w-full" />
                    <Input type="date" placeholder="dd/mm/yy" className="w-full" />
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="border-primary w-40 h-10 px-2">
                        <span className="text-sm whitespace-normal text-center">Cancel</span>
                    </Button>
                    <Button className="w-40 h-10 px-2">
                        <span className="text-sm whitespace-normal text-center">Create Campaign</span>
                    </Button>
                </div>
            </form>
        </section>
    )
}