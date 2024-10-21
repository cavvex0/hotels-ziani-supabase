"use client";
import { Button } from "@/src/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const DashPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <div className="">
      <Button onClick={handleLogout}>Sign out</Button>
    </div>
  );
};

export default DashPage;
