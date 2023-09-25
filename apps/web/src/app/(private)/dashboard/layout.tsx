import { Avatar } from "../../../components/avatar";
import { LogoIcon } from "../../../components/logo";
import { SignOutButton } from "./components/signoutButton";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="bg-header/[0.6] fixed inset-0 z-10 max-h-14">
        <div className="flex justify-between px-5 py-2">
          <LogoIcon />
          <div className="flex gap-5">
            <SignOutButton />
            <Avatar fullName="Alex Raonsssssss" />
          </div>
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
};

export default PrivateRoute;
