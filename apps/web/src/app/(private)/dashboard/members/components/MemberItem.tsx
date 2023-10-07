import { Avatar } from "../../../../../components/avatar";
import { MemberActionMenu } from "./MemberActionMenu";

export const MemberItem = () => {
  return (
    <li className="list-none p-5">
      <div className="flex items-center justify-between align-middle">
        <div className="flex items-center justify-between gap-2 align-middle">
          <Avatar fullName="Avinash k" />
          <div>Avinash k </div>
        </div>
        <div>member@email.com</div>
        <div>designation</div>
        <div>role</div>
        <MemberActionMenu />
      </div>
    </li>
  );
};
