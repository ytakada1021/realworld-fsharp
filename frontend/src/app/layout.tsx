import { Footer } from "@/components/Footer";
import { HeaderContainer } from "@/components/Header";
import "@/styles/font.css";
import "@/styles/main.css";
import "ionicons/css/ionicons.min.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conduit",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <HeaderContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;