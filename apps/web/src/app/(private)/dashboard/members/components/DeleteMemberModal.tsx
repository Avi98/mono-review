import { Modal } from "../../../../../components/modal";
import { useModal } from "./ModalProviders";

export const DeleteMemberModal = () => {
  const { isOpenModal, memberName } = useModal();

  return (
    // <Modal open={isOpenModal} title={`Delete Member modal`} trigger={trigger}>
    //   <div>Delete Role</div>
    // </Modal>
    <div>hi</div>
  );
};
