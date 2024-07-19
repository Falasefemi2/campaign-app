import { Input } from "@/components/ui/input";

export default function CampaignCreation() {
    return (
        <section className="p-4 sm:p-6 md:p-10">
            <h1 className="text-primary font-bold text-xl mb-4">Create New Campaign</h1>
            <form className="max-w-2xl">
                <Input type="text" placeholder="e.g The Future now" className="w-full" />
            </form>
        </section>
    )
}