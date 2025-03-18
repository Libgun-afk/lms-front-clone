import { GET_BRANCHES } from "@/graphql/queries";
import client from "@/lib/apollo-client";
import BranchList from "@/components/BranchList";
import Filter from "@/components/Filter";
import Tab from "@/components/Tabs";
import { FaPrint } from "react-icons/fa6";
import { LuPanelRightClose } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

async function getBranches() {
  try {
    const { data } = await client.query({
      query: GET_BRANCHES,
    });

    return data?.getBranches?.items || [];
  } catch (error) {
    console.error("Failed to fetch branches:", (error as Error).message);
    return [];
  }
}

export default async function BranchPage() {
  const branches = await getBranches();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center ">
        <Tab />
        <div className="mt-1 flex gap-2 pr-3">
          <div className=" flex  items-center border-2 border-gray-300 text-white px-4 py-2 rounded-xl">
            {" "}
            <CiSearch className="text-gray-500 w-[18px] h-[16px]" />
          </div>
          <div className=" flex  items-center border-2 border-gray-300 text-white px-4 py-2 rounded-xl">
            {" "}
            <LuPanelRightClose className="text-gray-500 w-[18px] h-[16px]" />
          </div>
          <button className="gap-2 flex  items-center bg-[#3051A0] text-white px-4 py-2 rounded-xl">
            <FaPrint className="w-[18px] h-[16px]" /> Хэвлэх
          </button>
        </div>
      </div>

      <div className="flex p-3">
        {/* <Filter /> */}
        <BranchList branches={branches} />
      </div>
    </div>
  );
}
