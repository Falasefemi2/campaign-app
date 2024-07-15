import Link from "next/link"
import {
    Bell,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import logo from "../public/images/logo.png"
import Image from "next/image"


export default function Sidebar() {
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
                        <Button className="mb-4">New Campaign</Button> {/* Added mb-4 for bottom margin */}
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Overviews
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Package className="h-4 w-4" />
                            Campaigns{" "}
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Users className="h-4 w-4" />
                            Market Intelligence
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <LineChart className="h-4 w-4" />
                            Account Settings
                        </Link>
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