import { AddMembers } from "../../../../../../illustrations/ic-add-member";
import { Button } from "../../../../../components/button/Button";
import { AddMemberButtonContainer } from "../../components/add-member/AddMember";

export const EmptyMemberList = () => {
  return (
    <div className="flex h-full w-full flex-col place-items-center  justify-center">
      <div className="flex flex-col items-center align-middle">
        <AddMembers height={"20rem"} width={"20rem"} />
        <p className="py-3 text-3xl">No members found for this organization</p>
        <p className="text-muted-foreground my-4 text-lg">Please add members</p>
        <AddMemberButtonContainer>
          <Button type="button">Add members</Button>
        </AddMemberButtonContainer>
      </div>
    </div>
  );
};
