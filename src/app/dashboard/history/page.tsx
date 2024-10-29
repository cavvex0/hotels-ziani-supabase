import HistoryPage from "@/src/sections/HistoryPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();
  const { data: history } = await supabase.from("history").select("*");

  const {data:hotels} = await supabase.from("hotels").select("*")

  if (!history || !hotels) {
    return null;
  }
  return (
    <div className="">
      <HistoryPage history={history} hotels={hotels} />
    </div>
  );
};

export default Page;
