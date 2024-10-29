
import HotelsPage from "@/src/sections/HotelsPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();

  const { data: hotels } = await supabase
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });
  if (!hotels) {
    return null;
  }
  return (
    <div className="flex-1 min-h-[calc(100vh-12rem)] flex items-center justify-center py-9">
      <HotelsPage hotels={hotels} />
    </div>
  );
};

export default Page;
