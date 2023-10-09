import { Modal } from "../../../../../components/modal";
import { useModal } from "./ModalProviders";

export const DeleteMemberModal = () => {
  const { isOpenModal: isOpen, memberName } = useModal();

  return (
    <Modal open={isOpen} title={`Update role of ${memberName}`}>
      <div>Delete modal</div>
    </Modal>
  );
};
