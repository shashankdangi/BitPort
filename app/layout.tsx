import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Providers from "./providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BitPort",
  description: "Generate ShortUrls",
  icons: {
    icon: "logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen w-full bg-[#020617] relative md:p-[1rem]">
              {/* Dark Sphere Grid Background */}
              <div
                className="absolute inset-0 ]"
                style={{
                  background: "#020617",
                  backgroundImage: `
                    linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
                  `,
                  backgroundSize: "32px 32px, 32px 32px, 100% 100%",
                }}
              />
              {/* Your Content/Components */}
              <Navbar session={session} />
              <main className="p-[1rem] z-10 relative"> {children}</main>
            </div>
            <Toaster position="top-right" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
