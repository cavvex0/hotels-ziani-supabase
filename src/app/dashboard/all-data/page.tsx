import AllDataPage from "@/src/components/AllDataPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();

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
      <AllDataPage soins={soins} hotels={hotels} role="admin" />
    </div>
  );
};

export default Page;
