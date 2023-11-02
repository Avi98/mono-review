import { Dropdown } from "../../../../../components/dropdownMenu/DropdownMenu";
import { DeleteMemberModal } from "./DeleteMemberModal";
import { MemberRoleChangeModal } from "./MemberRoleChangeModal";
import {
  RemoveMemberModalTrigger,
  RoleUpdateModalTrigger,
} from "./ModalActionTrigger";
import { MemberActionsModalProvider } from "./ModalProviders";

interface IMemberActionMenu {}
export const MemberActionMenu = ({}: IMemberActionMenu) => {
  const dropdownItemStyle =
    "m-2 flex gap-4 p-2 outline-none hover:bg-sky-700 active:bg-sky-700 focus:bg-sky-700 rounded";

  return (
    <MemberActionsModalProvider memberName="Avinash k" memberRole="member">
      <Dropdown>
        <RemoveMemberModalTrigger dropdownItemStyle={dropdownItemStyle} />
        <RoleUpdateModalTrigger dropdownItemStyle={dropdownItemStyle} />
      </Dropdown>
      <MemberRoleChangeModal />
      <DeleteMemberModal />
    </MemberActionsModalProvider>
  );
};
