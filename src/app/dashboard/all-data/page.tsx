import AllDataPage from "@/src/components/AllDataPage";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

const Page = async () => {
  const supabase = createClient();
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
    return null;
  }

  return (
    <div className="">
      <AllDataPage
        soins={soins}
        hotels={hotels}
        role={roleName}
        emirates={emirates}
      />
    </div>
  );
};

export default Page;
