import { Footer } from "@/modules/common/components/footer";
import { Header } from "@/modules/common/components/header";
import { Toasts } from "@/modules/common/components/toast/toasts";
import "@/modules/common/styles/font.css";
import "@/modules/common/styles/main.css";
import { getSessionData } from "@/shared/auth/session";
import "ionicons/css/ionicons.min.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Conduit",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const session = getSessionData();

  return (
    <html lang="en">
      <body>
        <Header authUser={session?.authUser} />
        {children}
        <Footer />
        <Toasts />
      </body>
    </html>
  );
};

export default RootLayout;
