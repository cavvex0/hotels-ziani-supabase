import AllDataPage from "@/src/sections/AllDataPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: role } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();
  const roleName = role?.role;

  const { data: soins } = await supabase
    .from("soins")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: hotels } = await supabase
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });

  if (!soins || !hotels) {
    return (
      <div className="fixed inset-0 h-screen w-screen bg-prime text-white z-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="">
      <AllDataPage soins={soins} hotels={hotels} role={roleName} />
    </div>
  );
};

export default Page;
