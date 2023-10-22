import { useCallback, useState } from "react";
import { Modal } from "../../../../../components/modal";
import {
  SelectDropdownBox,
  SelectGroup,
  SelectInput,
  SelectItem,
} from "../../../../../components/select";
import { useMemberActionModal } from "./ModalProviders";
import { type MEMBER_ROLE } from "../../../../../utils/types";
import { castStringToMember as castStringToMemberRole } from "../../../../../utils";

interface IMemberRoleChangeModal {}

const role_options = [
  {
    label: "Admin",
    value: "admin",
  },
  { label: "Member", value: "member" },
];

export const MemberRoleChangeModal = ({}: IMemberRoleChangeModal) => {
  const {
    isUpdateMemberModalOpen: isOpen,
    memberName,
    memberRole,
    toggleUpdateMemberModal,
  } = useMemberActionModal();

  const [role, setRole] = useState<MEMBER_ROLE>(memberRole);

  const updateMemberRole = useCallback((value: string) => {
    const role = castStringToMemberRole(value);
    if (role) setRole(role);
  }, []);

  return (
    <Modal
      open={isOpen}
      title={`Update role`}
      closeModal={toggleUpdateMemberModal}
    >
      <div className="flex justify-between px-2">
        <div>Update role</div>
        <SelectDropdownBox
          value={role}
          onChange={updateMemberRole}
          options={role_options}
        />
      </div>
    </Modal>
  );
};
