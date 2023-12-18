import { useDeleteMember } from "../../../../../../api/org";
import { Button } from "../../../../../components/button/Button";
import { Modal } from "../../../../../components/modal";
import { toast } from "../../../../../components/toast/use-toast";
import { useMemberActionModal } from "./ModalProviders";

export const DeleteMemberModal = ({ memberId }: { memberId: string }) => {
  const {
    isDeleteMemberModalOpen: isOpen,
    memberName,
    toggleDeleteMemberModal,
  } = useMemberActionModal();

  const { mutate: deleteMember, isLoading } = useDeleteMember({
    onSuccess: () => {
      toggleDeleteMemberModal();
      toast({
        desc: "Welcome back!",
        title: "Login Successful",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        desc: "Login failed",
        title: error?.message || "Something went wrong",
        variant: "error",
      });
    },
  });

  const handleDeleteMember = () => {
    return deleteMember(memberId);
  };

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
            <Button
              size={"lg"}
              disabled={isLoading}
              onClick={toggleDeleteMemberModal}
            >
              Cancel
            </Button>
            <Button
              size={"lg"}
              variant="destructive"
              isLoading={isLoading}
              type="button"
              onClick={handleDeleteMember}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
