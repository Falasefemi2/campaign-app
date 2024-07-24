export default function EditPage() {
    return (
        <div>
            Edit page
        </div>
    )
}



// "use client";

// import { editCampaign } from "@/actions/editCampaign";
// import { useRouter } from "next/navigation";

// export function EditCampaignForm({ campaignId }) {
//   const router = useRouter();

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
    
//     try {
//       await editCampaign(campaignId, formData);
//       router.push("/campaigns"); // Redirect to campaigns list
//       router.refresh(); // Refresh the page data
//     } catch (error) {
//       console.error("Failed to edit campaign:", error);
//       // Handle error (e.g., show error message to user)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Your form fields here */}
//       <button type="submit">Update Campaign</button>
//     </form>
//   );
// }