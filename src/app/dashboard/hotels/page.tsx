import HotelsPage from "@/src/components/HotelsPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();

  const { data: hotels } = await supabase.from("hotels").select("*");
  if (!hotels) {
    return null;
  }
  return (
    <div className="">
      <HotelsPage hotels={hotels} />
    </div>
  );
};

export default Page;
