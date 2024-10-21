import DashPage from "@/src/components/DashPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return redirect("/login");
  }
  return (
    <div className="">
      <DashPage/>
    </div>
  );
};

export default Dashboard;
