import Navbar from "@/src/components/Navbar";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default DashLayout;
