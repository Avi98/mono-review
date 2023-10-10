import { useCallback, useState } from "react";
import { Modal } from "../../../../../components/modal";
import {
  SelectGroup,
  SelectInput,
  SelectItem,
} from "../../../../../components/select";
import { useMemberActionModal } from "./ModalProviders";
import { MEMBER_ROLE } from "../../../../../utils/types";

interface IMemberRoleChangeModal {}

export const MemberRoleChangeModal = ({}: IMemberRoleChangeModal) => {
  const {
    isUpdateMemberModalOpen: isOpen,
    memberName,
    memberRole,
    toggleUpdateMemberModal,
  } = useMemberActionModal();

  const [role, setRole] = useState<MEMBER_ROLE>(memberRole);

  const updateMemberRole = useCallback((value: MEMBER_ROLE) => {
    setRole(value);
  }, []);

  //WIP @TODO
  return (
    <Modal
      open={isOpen}
      title={`Update role`}
      description="Update member role to?"
      closeModal={toggleUpdateMemberModal}
    >
      <div>
        <SelectInput label="Member" onChange={updateMemberRole} value={role}>
          <SelectGroup>
            <SelectItem>G</SelectItem>
            <SelectItem>S</SelectItem>
          </SelectGroup>
        </SelectInput>
      </div>
    </Modal>
  );
};
