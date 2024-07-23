
import { Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs'
import { auth, currentUser } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import db from "@/db/drizzle";


export default async function Navbar() {
    const { userId } = auth();
    const user = await currentUser();

    if (userId && user) {
        try {
            // await createUser();
            const newUser = await db
                .insert(users)
                .values({
                    clerkId: userId,
                    email: user.emailAddresses[0].emailAddress,
                    profileImageUrl: user.imageUrl,
                })
                .onConflictDoUpdate({
                    target: users.clerkId,
                    set: {
                        email: user.emailAddresses[0].emailAddress,
                        profileImageUrl: user.imageUrl,
                        updatedAt: new Date(),
                    },
                })
                .returning();

            console.log("User created or updated:", newUser[0]);
        } catch (error) {
            console.error("Error creating user in database:", error);
        }
    }

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileNav />
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            {!userId ? (
                <div className="flex gap-2">
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="outline">Sign Up</Button>
                    </SignUpButton>
                </div>
            ) : (
                <UserButton />
            )}
        </header>
    )
}