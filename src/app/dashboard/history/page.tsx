import HistoryPage from "@/src/components/HistoryPage";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();
  const { data: history } = await supabase.from("history").select("*");

  if (!history) {
    return null;
  }
  return (
    <div className="">
      <HistoryPage history={history} />
    </div>
  );
};

export default Page;
