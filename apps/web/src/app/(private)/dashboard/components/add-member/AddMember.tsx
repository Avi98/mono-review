import React from "react";
import { AddMemberModal } from "./AddMemberModal";

export const AddMemberButtonContainer = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const AddMemberButton = React.cloneElement(children, { onClick: openModal });

  return (
    <>
      {AddMemberButton}
      <AddMemberModal closeModal={closeModal} isOpen={isOpen} orgName="" />
    </>
  );
};
