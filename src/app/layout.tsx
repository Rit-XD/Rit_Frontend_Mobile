import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rit",
  description: "Revolution in Transport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/lyq6zua.css"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
