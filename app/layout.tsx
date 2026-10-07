import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${bricolage.variable} antialiased`}>
        {clerkConfigured ? (
          <ClerkProvider appearance={{ theme: shadcn }}>
            <Navbar clerkConfigured={clerkConfigured} />
            {children}
          </ClerkProvider>
        ) : (
          <>
            <div role="alert" className="bg-amber-100 px-4 py-3 text-center text-sm text-amber-950">
              Clerk authentication is not configured. Add your Clerk publishable and secret keys
              to <code>.env.local</code>, then restart the development server.
            </div>
            <Navbar clerkConfigured={clerkConfigured} />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
