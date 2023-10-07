import { Edit, Trash2 } from "lucide-react";
import {
  Dropdown,
  DropdownItem,
} from "../../../../../components/dropdownMenu/DropdownMenu";
import { MemberRoleChangeModal } from "./MemberRoleChangeModal";

interface IMemberActionMenu {}
export const MemberActionMenu = ({}: IMemberActionMenu) => {
  const dropdownItemStyle =
    "m-2 flex gap-4 p-2 outline-none hover:bg-sky-700 active:bg-sky-700 focus:bg-sky-700 rounded";

  const openRoleChangeModal = () => {};
  const openDeleteMemberModal = () => {};
  return (
    <Dropdown>
      <DropdownItem
        className={dropdownItemStyle}
        onClick={openDeleteMemberModal}
      >
        <Trash2 />
        Remove member
      </DropdownItem>
      <DropdownItem onClick={openRoleChangeModal} className={dropdownItemStyle}>
        <Edit />
        Change role
      </DropdownItem>
    </Dropdown>
  );
};
