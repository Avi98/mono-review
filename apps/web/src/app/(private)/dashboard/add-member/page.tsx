import { UserAvatar } from "../../../../components/user-avatar/UserAvatart";
import { AddMemberForm } from "../components/add-member/AddMemberForm";

const AddMembers = () => {
  return (
    <div className="mt-5 h-full w-full">
      <div className="flex flex-col gap-4 text-center">
        <div className="m-auto my-2 h-40 w-40">
          <UserAvatar />
        </div>
        <div className="text-2xl font-semibold antialiased">Add new member</div>
        <div className="border-border m-auto w-[40%] rounded-md border px-16 py-10 shadow-lg">
          <div className="m-auto max-w-lg">
            <AddMemberForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMembers;
