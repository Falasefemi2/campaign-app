"use client";

import Link from "next/link"
import {
    Clock,
    Lightbulb,
    Settings,
    Speaker,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import logo from "../public/images/logo.png"
import Image from "next/image"
import { usePathname } from "next/navigation"

export const navLinks = [
    {
        label: 'Overview',
        href: '/',
        icon: <Clock />
    },
    {
        label: 'Campaign',
        href: '/campaign',
        icon: <Speaker />
    },
    {
        label: 'Market Intelligence',
        href: '/market',
        icon: <Lightbulb />
    },
    {
        label: 'Account Settings',
        href: '/account',
        icon: <Settings />
    }
]

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image src={logo} alt="logo" className="w-12 h-12" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#247B7B] to-[#3B247B] font-bold text-3xl">Scrutz</span>
                    </Link>
                </div>
                <div className="flex-1 flex flex-col mt-6"> {/* Added mt-6 for top margin */}
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4"> {/* Added gap-4 for space between nav items */}
                        <Link href="/campaign/create">
                            <Button className="mb-4 w-full">New Campaign</Button> {/* Added mb-4 for bottom margin */}
                        </Link>
                        {navLinks.map((navlink) => (
                            <Link
                                key={navlink.label}
                                href={navlink.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === navlink.href ? "bg-muted text-primary" : ""}`}
                            >
                                {navlink.icon}
                                {navlink.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to our support
                                team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </aside>
    )
}