import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "tailwindcss/tailwind.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App",
  description: "This is a solution to the Product Feedback App challenge on Frontend Mentor",
  icons: {
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-link-water`}>{children}</body>
    </html>
  );
}
