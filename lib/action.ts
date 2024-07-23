/** @format */
"use server";

import db from "@/db/drizzle";
import { campaigns, users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { campaignSchema } from "./campaignSchema";
import { fromZodError } from "zod-validation-error";

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
  const linkedKeywords = (formData.get("linkedKeywords") as string)
    .split(",")
    .filter(Boolean);
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

// export async function createCampaign(formData: FormData) {
//   const { userId: clerkUserId } = auth();

//   if (!clerkUserId) throw new Error("User not authenticated");

//   // Fetch the user from our database using the Clerk ID
//   const dbUser = await db
//     .select()
//     .from(users)
//     .where(eq(users.clerkId, clerkUserId))
//     .limit(1);

//   if (dbUser.length === 0) throw new Error("User not found in database");

//   const userId = dbUser[0].id; // This is the UUID from our database

//   // Convert FormData to a plain object
//   const formDataObject = Object.fromEntries(formData.entries());

//   // Validate and parse the form data using the schema
//   const result = campaignSchema.safeParse({
//     ...formDataObject,
//     digestCampaign: formData.get("digestCampaign") === "on",
//     linkedKeywords: (formData.get("linkedKeywords") as string)
//       .split(",")
//       .filter(Boolean),
//   });

//   if (!result.success) {
//     // If validation fails, throw an error with details
//     const errorMessage = fromZodError(result.error).message;
//     throw new Error(`Invalid form data: ${errorMessage}`);
//   }

//   // Use the validated and parsed data
//   const {
//     campaignName,
//     campaignDescription,
//     startDate,
//     endDate,
//     digestCampaign,
//     linkedKeywords,
//     dailyDigest,
//   } = result.data;

//   await db.insert(campaigns).values({
//     userId,
//     campaignName,
//     campaignDescription,
//     startDate: new Date(startDate),
//     endDate: new Date(endDate),
//     digestCampaign,
//     linkedKeywords,
//     dailyDigest,
//   });

//   redirect("/campaign");
// }

export async function fetchAllCampaigns() {
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
