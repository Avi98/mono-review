import { ReactElement, cloneElement, useState } from "react";
import { Modal } from "../../../../../components/modal";

interface IMemberRoleChangeModal {
  memberName: string;
  trigger: JSX.Element;
}
export const MemberRoleChangeModal = (props: IMemberRoleChangeModal) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(true);
  };
  const Trigger = cloneElement(props.trigger, { onClick: toggleModal });

  return (
    <Modal
      open={true}
      title={`Update role of ${props.memberName}`}
      trigger={Trigger}
    >
      <div>Update Role</div>
    </Modal>
  );
};
