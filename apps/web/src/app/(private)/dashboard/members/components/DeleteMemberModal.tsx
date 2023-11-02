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
      <div className="p-1">
        <p className="text-sm">
          Are you sure you want to delete&nbsp;{`"${memberName}"`}.
        </p>
        <div className="flex justify-end pt-10">
          <div className="flex gap-3 py-2">
            <Button size={"lg"}>Cancel</Button>
            <Button size={"lg"} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
