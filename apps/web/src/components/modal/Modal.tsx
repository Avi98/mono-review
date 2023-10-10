import * as Dialog from "@radix-ui/react-dialog";
import { IWithChildren } from "../../interfaces/IWithChildren";
import { ReactElement, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/classNameMerge";

export const Trigger = ({ children }: IWithChildren) => (
  <Dialog.Trigger asChild>{children}</Dialog.Trigger>
);

interface IModal extends IWithChildren {
  trigger?: ReactElement;
  title: string;
  description?: string;
  open: boolean;
  closeModal(): void;
  contentClassName?: HTMLDivElement["className"];
  children: ReactNode;
}

export const Modal = (props: IModal) => {
  return (
    <Dialog.Root open={props.open}>
      {props.trigger ? <Trigger>{props.trigger}</Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/75 outline-border data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content
          onInteractOutside={props.closeModal}
          className={cn(
            "border-border data-[state=open]:animate-contentShow bg-background fixed left-[50%] top-[50%] z-20 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] border-2  focus:outline-none",
            props.contentClassName
          )}
        >
          <div className="border-border m-0 flex justify-between border-b-2 px-[25px] py-[10px] text-[17px] font-medium">
            <Dialog.Title className="text-foreground">
              {props.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 focus:border-border flex h-[35px] w-[35px] items-center rounded-full  border-none p-1 focus:border-[2px]"
                aria-label="Close"
                onClick={props.closeModal}
              >
                <X height={25} width={25} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
            {props.description}
          </Dialog.Description>
          {props.children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
