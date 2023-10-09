import { Modal } from "../../../../../components/modal";
import { useModal } from "./ModalProviders";

interface IMemberRoleChangeModal {}

export const MemberRoleChangeModal = ({}: IMemberRoleChangeModal) => {
  const { isOpenModal: isOpen, memberName } = useModal();
  return (
    <Modal open={isOpen} title={`Update role of ${memberName}`}>
      <div>Update Role</div>
    </Modal>
  );
};
