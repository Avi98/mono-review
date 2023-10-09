import { Modal } from "../../../../../components/modal";
import { useMemberActionModal } from "./ModalProviders";

export const DeleteMemberModal = () => {
  const {
    isDeleteMemberModalOpen: isOpen,
    memberName,
    toggleDeleteMemberModal,
  } = useMemberActionModal();

  return (
    <Modal
      open={isOpen}
      title={`Update role of ${memberName}`}
      closeModal={toggleDeleteMemberModal}
    >
      <div>Delete modal</div>
    </Modal>
  );
};
