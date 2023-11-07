import { Avatar } from "../../../../../components/avatar";
import { MemberActionMenu } from "./MemberActionMenu";

interface IMemberItem {
  fullName: string;
  email: string;
  jobTitle: string;
  role: string;
}
export const MemberItem = (props: IMemberItem) => {
  return (
    <li className="list-none p-5">
      <div className="flex items-center justify-between align-middle">
        <div className="flex items-center justify-between gap-2 align-middle">
          <Avatar fullName="Avinash k" />
          <div>{props.fullName}</div>
        </div>
        <div>{props.email}</div>
        <div>{props.jobTitle}</div>
        <div>{props.role}</div>

        <MemberActionMenu />
      </div>
    </li>
  );
};
