// Code by Utsav Patel
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZeroReject | AR AI Dashboard",
  description: "AI-Powered Dashboard for Zero Rejections"
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          {/* Add your logo path here */}
          <link rel="icon" href="/logo4.png" sizes="any" />
          {/* or use PNG/SVG */}
          {/* <link rel="icon" href="/logo.png" type="image/png" /> */}
        </head>
        <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
