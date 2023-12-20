import { ReactNode } from "react";
import { AuthProvider } from "./dashboard/providers/AuthProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
