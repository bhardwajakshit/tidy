"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence } from "framer-motion";
import { ROUTE } from "@/utils/constants";

export default function App({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    checkUserSession();
  }, []);

  async function checkUserSession() {
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      if (pathname !== ROUTE.HOME && pathname !== ROUTE.PRIVACY_POLICY) {
        window.location.href = ROUTE.HOME;
      }
    } else if (pathname.includes(ROUTE.HOME)) {
      window.location.href = ROUTE.AUTH;
    }
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AnimatePresence>{children}</AnimatePresence>
      </body>
    </html>
  );
}
