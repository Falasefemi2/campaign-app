/** @format */

"use server";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createUser() {
  const { userId } = auth();
  if (!userId) {
    // Query DB for user specific information or display assets only to signed in users
    throw new Error("User not authenticated");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const newUser = await db
      .insert(users)
      .values({
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
        // Note: createdAt and updatedAt will be set automatically due to defaultNow()
      })
      .returning();

    console.log("User inserted:", newUser);
    return newUser[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}
