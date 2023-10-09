import { Dropdown } from "../../../../../components/dropdownMenu/DropdownMenu";
import {
  RemoveMemberModalTrigger,
  RoleUpdateModalTrigger,
} from "./ModalActionTrigger";
import { ModalProvider } from "./ModalProviders";

interface IMemberActionMenu {}
export const MemberActionMenu = ({}: IMemberActionMenu) => {
  const dropdownItemStyle =
    "m-2 flex gap-4 p-2 outline-none hover:bg-sky-700 active:bg-sky-700 focus:bg-sky-700 rounded";

  return (
    <Dropdown>
      <ModalProvider memberName="Remove member">
        <RemoveMemberModalTrigger dropdownItemStyle={dropdownItemStyle} />
      </ModalProvider>
      <ModalProvider memberName="name">
        <RoleUpdateModalTrigger dropdownItemStyle={dropdownItemStyle} />
      </ModalProvider>
    </Dropdown>
  );
};
