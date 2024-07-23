/** @format */

import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  date,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  profileImageUrl: text("profile_image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  campaignName: varchar("campaign_name", { length: 255 }).notNull(),
  campaignDescription: text("campaign_description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  digestCampaign: boolean("digest_campaign").default(false),
  linkedKeywords: jsonb("linked_keywords").default([]).notNull(),
  dailyDigest: varchar("daily_digest", { length: 10 }).notNull(), // 'daily', 'weekly', or 'yearly'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
