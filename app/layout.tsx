import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// We use the relative path here to ensure it works immediately. 
// If you successfully set up the '@/' alias, you can use import Shell from "@/components/layout/Shell";
import Shell from "../components/layout/Shell";

const inter = Inter({ subsets: ["latin"] });

// ENTERPRISE METADATA SETUP
export const metadata: Metadata = {
  title: {
    template: '%s | ERP Portal', // %s is replaced by the page's specific title
    default: 'Dashboard | ERP Portal', // This shows if a page doesn't specify a title
  },
  description: "Enterprise Resource Planning System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* Google Material Symbols Font */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>
        {/* The Shell wraps the entire application to provide the persistent Sidebar/Header */}
        <Shell>
            {children}
        </Shell>
      </body>
    </html>
  );
}