import EditCampaignForm from "./editCampageForm";
import { getCampaign } from "@/lib/action";


export default async function EditCampaignPage({ params }: { params: { id: string } }) {
    console.log("Attempting to edit campaign with ID:", params.id);

    try {
        const campaign = await getCampaign(params.id);

        if (!campaign) {
            console.log("No campaign found for ID:", params.id);
            return <div>Campaign not found</div>;
        }

        return (
            <div>
                <EditCampaignForm campaign={campaign} />
            </div>
        );
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return <div>Error loading campaign. Please try again.</div>;
    }
}