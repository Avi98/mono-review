import * as Dialog from "@radix-ui/react-dialog";
import { IWithChildren } from "../../interfaces/IWithChildren";
import { ReactElement } from "react";
import { X } from "lucide-react";

export const Trigger = ({ children }: IWithChildren) => (
  <Dialog.Trigger asChild>{children}</Dialog.Trigger>
);

interface IModal extends IWithChildren {
  trigger: ReactElement;
  title: string;
  description?: string;
  open: boolean;
}

export const Modal = (props: IModal) => {
  return (
    <Dialog.Root open={props.open}>
      <Trigger>{props.trigger}</Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content>
          <Dialog.Content>
            <Dialog.Title>{props.title}</Dialog.Title>
            {props.description ? (
              <Dialog.Description>{props.description}</Dialog.Description>
            ) : null}
            <Dialog.Close>
              <X />
            </Dialog.Close>
            {props.children}
          </Dialog.Content>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
