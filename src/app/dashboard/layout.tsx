import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-14 min-h-[calc(100vh-6rem)] px-5 lg:px-0">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default DashLayout;
