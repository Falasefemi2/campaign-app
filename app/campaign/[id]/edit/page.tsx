import db from "@/db/drizzle";
import { campaigns } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditCampaignForm from "./editCampageForm";

// export default async function EditCampaignPage({ params }: { params: { id: string } }) {
//     const campaign = await db.select().from(campaigns).where(eq(campaigns.id, params.id)).limit(1);

//     if (!campaign.length) {
//         notFound();
//     }

//     return <EditCampaignForm campaign={campaign[0]} />;
// }



// export default async function EditCampaignPage({ params }: { params: { id: string } }) {
//     const campaign = await db
//         .select()
//         .from(campaigns)
//         .where(sql`CAST(${campaigns.id} AS TEXT) = ${params.id}`)
//         .limit(1);

//     if (!campaign.length) {
//         notFound();
//     }

//     return <EditCampaignForm campaign={campaign[0]} />;
// }

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
    console.log("Attempting to fetch campaign with ID:", params.id);


    const campaign = await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.id, params.id))
        .limit(1);

    console.log("Query result:", campaign);

    if (!campaign.length) {
        console.log("Campaign not found, calling notFound()");
        notFound();
    }

    return <EditCampaignForm campaign={campaign[0]} />;
}