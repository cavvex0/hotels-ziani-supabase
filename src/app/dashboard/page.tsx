import AddSoin from "@/src/components/AddSoin";
import DashPage from "@/src/components/DashPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return redirect("/login");
  }

  const { data: soins } = await supabase
    .from("soins")
    .select("*")
    .order("created_at", { ascending: true });

  if (!soins) {
    return (
      <div className="py-9">
        <div className="bg-white min-h-[500px] rounded-[37px] shadoww border border-gray-300 relative pb-[4rem] flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <AddSoin />
      <DashPage soins={soins} />
    </div>
  );
};

export default Dashboard;
