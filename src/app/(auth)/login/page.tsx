import LoginPage from "@/src/components/LoginPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user) {
    return redirect("/dashboard");
  }
  const { data:username } = await supabase.from("profiles").select("username");
  console.log(username)

  return (
    <div className="h-full">
      <LoginPage username={username} />
    </div>
  );
};

export default Login;
