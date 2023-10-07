import { Avatar } from "../../../components/avatar";
import { OuterSideBar } from "./components/OuterSideBar";
import { SignOutButton } from "./components/SignoutButton";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <header
        className={`bg-header/[0.6] border-border fixed right-0 z-10 max-h-12 w-full border-b shadow-md`}
      >
        <div className="flex justify-end gap-2 px-5 py-1.5">
          <SignOutButton />
          <Avatar fullName="Alex Raonsssssss" />
        </div>
      </header>
      <div className="flex h-full">
        <OuterSideBar />
        <div className="relative top-12 h-full flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PrivateRoute;
