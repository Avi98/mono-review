import { ReactNode } from "react";
import { AuthProvider } from "./dashboard/providers/AuthProvider";
import { GET } from "./api/route";

const Layout = async ({ children }: { children: ReactNode }) => {
  const data = await GET();
  return <AuthProvider user={data}>{children}</AuthProvider>;
};

export default Layout;
