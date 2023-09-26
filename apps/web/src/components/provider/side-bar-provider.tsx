"use client";

import React from "react";

const SideBarContext = React.createContext<{
  isOpen: boolean;
  toggleSideBar: VoidFunction;
}>({
  isOpen: false,
  toggleSideBar: () => {},
});

interface ISideBarProvider {
  children: React.ReactNode;
}
const SideBarProvider = ({ children }: ISideBarProvider) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSideBar = React.useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <SideBarContext.Provider
      value={React.useMemo(
        () => ({ isOpen, toggleSideBar }),
        [isOpen, toggleSideBar]
      )}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const sideBarContext = React.useContext(SideBarContext);
  return sideBarContext;
};

export default SideBarProvider;
