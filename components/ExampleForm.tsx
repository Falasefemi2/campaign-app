// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
// import { Input } from "./ui/input"
// import { Button } from "./ui/button"
// import { campaignSchema } from "@/lib/campaignSchema"
// import { createCampaign } from "@/lib/action"





// const ExampleForm = () => {
//     // 1. Define your form.
//     const form = useForm<z.infer<typeof campaignSchema>>({
//         resolver: zodResolver(campaignSchema),
//         defaultValues: {
//             campaignName: "",
//             campaignDescription: "",
//             startDate: "",
//             endDate: "",
//             digestCampaign: false,
//             linkedKeywords: [],
//             dailyDigest: "",
//         },
//     });

//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof campaignSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         createCampaign(values)
//         console.log(values)
//     }
//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <FormField
//                     control={form.control}
//                     name="campaignName"
//                      render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="shadcn" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This is your public display name.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>

//     )
// }

// export default ExampleForm