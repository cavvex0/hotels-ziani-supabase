import { Oswald } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";
import TanstackProviders from "@/src/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";

const oswald = Oswald({ subsets: ["latin"] });

const realce = localfont({
  src: [{ path: "../../assets/fonts/realce-black-v0006.otf" }],
  variable: "--font-realce",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hotels-Ziani",
  description: "Created by Adam (@cavvex)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.className} ${realce.variable}`}
      suppressHydrationWarning
    >
      <body className="text-foreground h-full">
        <TanstackProviders>
          <AuthProvider>{children}</AuthProvider>
        </TanstackProviders>
        <Toaster
          toastOptions={{
            className: "text-sm",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
      </body>
    </html>
  );
}
