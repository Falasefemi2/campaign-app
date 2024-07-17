/** @format */

// /** @format */

// import { integer, text, boolean, pgTable, uuid } from "drizzle-orm/pg-core";

// export const users = pgTable("user", {
//   id: uuid("id").primaryKey().defaultRandom(),
// });

import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
