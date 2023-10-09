import { ReactElement } from "react";
import { Modal } from "../../../../../components/modal";

interface IMemberRoleChangeModal {
  trigger: ReactElement;
  isOpen: boolean;
  memberName: string;
}

export const MemberRoleChangeModal = ({
  trigger,
  isOpen,
  memberName,
}: IMemberRoleChangeModal) => {
  return (
    <Modal
      open={isOpen}
      title={`Update role of ${memberName}`}
      trigger={trigger}
    >
      <div>Update Role</div>
    </Modal>
  );
};
