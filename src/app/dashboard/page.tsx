import AddSoin from "@/src/components/AddSoin";
import DashPage from "@/src/components/DashPage";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  console.log(user)
  if (!user.data.user) {
    return redirect("/login");
  }
  const date = format(new Date(), "yyyy-MM-dd");
  const { data: emirates } = await supabase
    .from("soins")
    .select("*")
    .eq("hotel", "Emirates")
    .gte("created_at", date)
    .lt(
      "created_at",
      format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      )
    );

  const { data: soins } = await supabase
    .from("soins")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: hotels } = await supabase
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });

  if (!soins) {
    return (
      <div className="py-9">
        <div className="bg-white min-h-[500px] rounded-[37px] shadoww border border-gray-300 relative pb-[4rem] flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!hotels) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4 ">
      <AddSoin hotelsData={hotels} />
      <DashPage soins={soins} />
    </div>
  );
};

export default Dashboard;
