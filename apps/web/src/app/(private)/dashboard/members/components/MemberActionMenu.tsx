import { Dropdown } from "../../../../../components/dropdownMenu/DropdownMenu";
import { UserRoleEnum } from "../../../../../enums/memberRoleEnum";
import { DeleteMemberModal } from "./DeleteMemberModal";
import { MemberRoleChangeModal } from "./MemberRoleChangeModal";
import {
  RemoveMemberModalTrigger,
  RoleUpdateModalTrigger,
} from "./ModalActionTrigger";
import { MemberActionsModalProvider } from "./ModalProviders";

interface IMemberActionMenu {
  memberName: string;
  memberRole: UserRoleEnum;
  memberId: string;
}

export const MemberActionMenu = ({
  memberName,
  memberRole,
  memberId,
}: IMemberActionMenu) => {
  const dropdownItemStyle =
    "m-2 flex gap-4 p-2 outline-none hover:bg-sky-700 active:bg-sky-700 focus:bg-sky-700 rounded";

  return (
    <MemberActionsModalProvider memberName={memberName} memberRole={memberRole}>
      <Dropdown>
        <RemoveMemberModalTrigger dropdownItemStyle={dropdownItemStyle} />
        <RoleUpdateModalTrigger dropdownItemStyle={dropdownItemStyle} />
      </Dropdown>
      <MemberRoleChangeModal memberId={memberId} />
      <DeleteMemberModal memberId={memberId} />
    </MemberActionsModalProvider>
  );
};
