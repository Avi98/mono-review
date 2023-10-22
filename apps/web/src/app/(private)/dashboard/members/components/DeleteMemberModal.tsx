import { Button } from "../../../../../components/button/Button";
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
      title={`Delete member`}
      closeModal={toggleDeleteMemberModal}
    >
      <div className="p-5 ">
        <p>Are you sure you want to delete&nbsp;{`"${memberName}"`} ?</p>
        <div className="flex justify-end">
          <div className="flex gap-2 py-2">
            <Button>Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
