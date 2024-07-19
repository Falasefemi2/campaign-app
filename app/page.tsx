
import { DateOverview } from "@/components/DateOverview";
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";


export default function Home() {
  return (

    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
        <DateOverview />
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {/* <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3> */}
          <Search size={350} />
          <p className="text-sm text-muted-foreground">
            No activity yet. Create a new campaign to get started
          </p>
          <Button className="mt-4">New Campaign</Button>
        </div>
      </div>
    </main>



  );
}




