import { MemberList } from "./components/MemberList";

const Members = () => {
  return (
    <div className="container px-10 py-5">
      <h3 className="py-3 text-lg">All users in Organization</h3>
      <MemberList />
    </div>
  );
};
export default Members;
