import type { Metadata } from "next";
import "../styles/globals.css";
import App from "./app";

export const metadata: Metadata = {
  title: "Tidy",
  description: "Get things done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
