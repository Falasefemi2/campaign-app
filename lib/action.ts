/** @format */
"use server";

import db from "@/db/drizzle";
import { campaigns, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Campaign } from "@/components/CreateCampaignTable";

export async function createCampaign(formData: FormData) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) throw new Error("User not authenticated");

  // Fetch the user from our database using the Clerk ID
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUserId))
    .limit(1);

  if (dbUser.length === 0) throw new Error("User not found in database");

  const userId = dbUser[0].id; // This is the UUID from our database

  const campaignName = formData.get("campaignName") as string;
  const campaignDescription = formData.get("campaignDescription") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const digestCampaign = formData.get("digestCampaign") === "on";
  // const linkedKeywords = (formData.get("linkedKeywords") as string)
  //   .split(",")
  //   .filter(Boolean);
  const linkedKeywords = (formData.get("linkedKeywords") as string)
    .split(",")
    .filter(Boolean)
    .map((keyword) => keyword.trim());
  const dailyDigest = formData.get("dailyDigest") as string;

  await db.insert(campaigns).values({
    userId,
    campaignName,
    campaignDescription,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    digestCampaign,
    linkedKeywords,
    dailyDigest,
  });

  redirect("/campaign");
}

export async function fetchAllCampaigns(): Promise<Campaign[]> {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) throw new Error("User not authenticated");

  // Fetch the user from our database using the Clerk ID
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUserId))
    .limit(1);

  if (dbUser.length === 0) throw new Error("User not found in database");

  const userId = dbUser[0].id; // This is the UUID from our database

  // Fetch all campaigns for the user
  const userCampaigns = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.userId, userId));

  return userCampaigns;
}

export async function deleteCampaign(campaignId: string) {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) throw new Error("User not authenticated");

  await db.delete(campaigns).where(eq(campaigns.id, campaignId));
}
