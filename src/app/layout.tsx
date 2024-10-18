import { Oswald } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";

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
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
