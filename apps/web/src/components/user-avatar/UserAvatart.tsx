import { FemaleAvatar } from "../../../illustrations/ic-female-avatar";
import { MaleAvatar } from "../../../illustrations/ic-male-avatar";

interface IUserAvatar {
  isMale?: boolean;
}
export const UserAvatar = (props: IUserAvatar) => {
  //   return props.isMale ? <MaleAvatar /> : <FemaleAvatar />;
  return <MaleAvatar />;
};
