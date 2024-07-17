/** @format */

import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (existingUser.length === 0) {
      // User doesn't exist, create a new user
      const newUser = await db
        .insert(users)
        .values({
          clerkId: userId,
          email: user.emailAddresses[0].emailAddress,
          profileImageUrl: user.imageUrl,
          // Note: createdAt and updatedAt will be set automatically due to defaultNow()
        })
        .returning();

      return NextResponse.json(newUser[0]);
    } else {
      // User already exists, you might want to update some fields here
      return NextResponse.json(existingUser[0]);
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { error: "Failed to create/update user" },
      { status: 500 }
    );
  }
}
