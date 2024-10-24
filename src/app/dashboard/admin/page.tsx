import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

const Page = () => {
  return (
    <div className="bg-white h-[500px] rounded-2xl">
      <div className="flex items-center justify-between h-full">
        <form
          action=""
          className="flex-1 flex items-center justify-center h-full flex-col gap-5 px-9"
        >
          <Input placeholder="Name" />
          <Input placeholder="Password" />
          <Input placeholder="Role" />
          <Button variant={"hhhh"} className="">
            Add...
          </Button>
        </form>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Page;
