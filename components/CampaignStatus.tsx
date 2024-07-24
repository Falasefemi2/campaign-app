import { Campaign } from "./CreateCampaignTable";
import { Button } from "./ui/button";

interface CampaignStatusProps {
    campaigns: Campaign[];
}

export default function CampaignStatus({ campaigns }: CampaignStatusProps) {
    const allCount = campaigns.length;
    const activeCount = campaigns.filter(campaign => campaign.digestCampaign).length;
    const inactiveCount = allCount - activeCount;

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-primary text-primary">
                All ({allCount})
            </Button>
            <Button variant="outline" className="border-primary text-primary">
                Inactive ({inactiveCount})
            </Button>
            <Button variant="outline" className="border-primary text-primary">
                Active ({activeCount})
            </Button>
        </div>
    );
}