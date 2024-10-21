"use client";
import { Button } from "@/src/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import AddSoin from "./AddSoin";

const DashPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <AddSoin />
      {/* <HomePage Soins={filteredData} /> */}
    </div>
  );
};

export default DashPage;
