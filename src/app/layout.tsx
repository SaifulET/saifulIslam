import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomGlobalCursor from "@/components/CustomGlobalCursor";
import { TracingBeam } from "@/components/TracingBeam";

export const metadata: Metadata = {
  title: "Saiful Islam | Full Stack & Software Engineer",
  description: "Personal portfolio of Saiful Islam - Full Stack Developer, Distributed Systems Specialist, Next.js & Node.js Engineer.",
  keywords: ["Saiful Islam", "Full Stack Developer", "Software Engineer", "Next.js", "React", "Node.js", "MongoDB", "Distributed Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#070612] text-white">
        <CustomGlobalCursor />
        <ThemeProvider>
          <TracingBeam>
            {children}
          </TracingBeam>
        </ThemeProvider>
      </body>
    </html>
  );
}
