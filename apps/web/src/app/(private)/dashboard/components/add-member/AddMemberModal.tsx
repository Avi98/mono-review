import { Modal } from "../../../../../components/modal";
import { AddMemberForm } from "./AddMemberForm";

interface IAddMemberModal {
  isOpen: boolean;
  closeModal: VoidFunction;
  orgName: string;
}
export const AddMemberModal = ({
  isOpen,
  closeModal,
  orgName,
}: IAddMemberModal) => {
  return (
    <Modal open={isOpen} title={`Add member`} closeModal={closeModal}>
      <div className="p-1">
        {orgName && <p className="text-lg">{`Invite member to ${orgName}`} </p>}
        <div className="flex justify-end pt-10">
          <div className="flex w-full items-center justify-center gap-3 py-5 align-middle">
            <AddMemberForm onClose={closeModal} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
