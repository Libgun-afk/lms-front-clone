import BranchList from "@/components/branch/BranchList";
// import { GET_BRANCHES } from "@/graphql/queries";
// import client from "@/lib/apollo-client";

// async function getBranches() {
//   try {
//     const { data } = await client.query({
//       query: GET_BRANCHES,
//     });

//     return data?.getBranches?.items || [];
//   } catch (error) {
//     console.error("Failed to fetch branches: ", (error as Error).message);
//     return [];
//   }
// }

export default async function BranchPage() {

  return (
    <div >
      <BranchList/>
    </div>
  );
}
