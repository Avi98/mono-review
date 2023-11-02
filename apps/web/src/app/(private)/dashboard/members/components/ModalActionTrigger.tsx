import { Edit, Trash2 } from "lucide-react";
import { DropdownItem } from "../../../../../components/dropdownMenu/DropdownMenu";
import { useMemberActionModal } from "./ModalProviders";

interface IActionModalTrigger {
  dropdownItemStyle: HTMLDivElement["className"];
}

export const RoleUpdateModalTrigger = (props: IActionModalTrigger) => {
  const { toggleUpdateMemberModal: toggleModal } = useMemberActionModal();
  return (
    <DropdownItem onClick={toggleModal} className={props.dropdownItemStyle}>
      <Edit />
      Change role
    </DropdownItem>
  );
};

export const RemoveMemberModalTrigger = (props: IActionModalTrigger) => {
  const { toggleDeleteMemberModal: toggleModal } = useMemberActionModal();
  return (
    <DropdownItem className={props.dropdownItemStyle} onClick={toggleModal}>
      <Trash2 />
      Remove member
    </DropdownItem>
  );
};
