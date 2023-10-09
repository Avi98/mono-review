import { Modal } from "../../../../../components/modal";
import { useMemberActionModal } from "./ModalProviders";

interface IMemberRoleChangeModal {}

export const MemberRoleChangeModal = ({}: IMemberRoleChangeModal) => {
  const {
    isUpdateMemberModalOpen: isOpen,
    memberName,
    toggleUpdateMemberModal,
  } = useMemberActionModal();
  return (
    <Modal
      open={isOpen}
      title={`Update role of ${memberName}`}
      closeModal={toggleUpdateMemberModal}
    >
      <div>Update Role</div>
    </Modal>
  );
};
