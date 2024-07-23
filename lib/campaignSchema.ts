/** @format */

import * as z from "zod";

export const campaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  campaignDescription: z.string().min(1, "Campaign description is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
  digestCampaign: z.boolean(),
  linkedKeywords: z.array(z.string()).default([]),
  dailyDigest: z.string(),
});
