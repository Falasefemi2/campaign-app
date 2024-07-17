"use client";

import { useEffect } from "react";
import { CircleUser, Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from '@clerk/nextjs'

export default function Navbar() {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            // User is signed in, attempt to create user in your database
            fetch('/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clerkUserId: user.id })
            })
                .then(response => response.json())
                .then(data => console.log('User created or updated:', data))
                .catch(error => console.error("Error creating user in database:", error));
        }
    }, [isLoaded, isSignedIn, user]);


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
            <SignedOut>
                <SignInButton>
                    <Button>Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}