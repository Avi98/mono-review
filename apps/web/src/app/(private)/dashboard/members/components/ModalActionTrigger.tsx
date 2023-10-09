import { Edit, Trash2 } from "lucide-react";
import { DropdownItem } from "../../../../../components/dropdownMenu/DropdownMenu";
import { useModal } from "./ModalProviders";

interface IActionModalTrigger {
  dropdownItemStyle: HTMLDivElement["className"];
}

export const RoleUpdateModalTrigger = (props: IActionModalTrigger) => {
  const { isOpenModal, memberName, toggleModal } = useModal();
  console.log({ isOpenModalRole: isOpenModal });
  return (
    <DropdownItem onClick={toggleModal} className={props.dropdownItemStyle}>
      <Edit />
      Change role
    </DropdownItem>
  );
};

export const RemoveMemberModalTrigger = (props: IActionModalTrigger) => {
  const { isOpenModal, memberName, toggleModal } = useModal();
  return (
    <DropdownItem className={props.dropdownItemStyle} onClick={toggleModal}>
      <Trash2 />
      Remove member
    </DropdownItem>
  );
};
