"use client";
import { LogoResponsiveIcon } from "../../../../components/logo/responsive-logo";
import { useSideBar } from "../../../../components/provider/side-bar-provider";
import { CloseSideBar, NavBar, SideBar } from "../../../../components/sideBar";
import { ClipboardCheckIcon, Command, UserPlus2, Users } from "lucide-react";

export const OuterSideBar = () => {
  const { isOpen } = useSideBar();
  return (
    <SideBar>
      <NavBar.Header>
        <LogoResponsiveIcon hideName={!isOpen} />
      </NavBar.Header>
      <NavBar.List>
        <NavBar.LinkItem
          hideLabel={isOpen}
          href="/dashboard"
          icon={<Command />}
          label="All Projects"
        />
        <NavBar.LinkItem
          hideLabel={isOpen}
          href="/dashboard/members"
          icon={<Users />}
          label="View members"
        />
        <NavBar.LinkItem
          hideLabel={isOpen}
          href="/dashboard/add-member"
          icon={<UserPlus2 />}
          label="Add new members"
        />
        <NavBar.LinkItem
          hideLabel={isOpen}
          href="/dashboard/create-project"
          icon={<ClipboardCheckIcon />}
          label="Create new project"
        />
      </NavBar.List>
      <NavBar.Footer>
        <CloseSideBar />
      </NavBar.Footer>
    </SideBar>
  );
};
