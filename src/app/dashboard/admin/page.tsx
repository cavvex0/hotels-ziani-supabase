import AdminPage from "@/src/components/AdminPage";
import { createClient } from "@/utils/supabase/server";

const Page = async() => {
  const supabase = createClient();
  const { data: users } = await supabase.from("profiles").select("*");

  return (
    <div className="">
      <AdminPage users={users} />
    </div>
  );
};

export default Page;
