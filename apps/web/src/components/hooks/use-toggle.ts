import { useCallback, useState } from "react";

interface IUseToggle {
  onClose?(): void;
  onOpen?(): void;
}
export const useToggle = (props?: IUseToggle) => {
  const [open, setOpen] = useState(false);
  const { onClose: closeCB, onOpen: openCB } = props || {};

  const onClose = useCallback(() => {
    setOpen((isOpen) => {
      if (!isOpen) return false;

      closeCB?.();
      return false;
    });
  }, [closeCB]);

  const onOpen = useCallback(() => {
    setOpen((isOpen) => {
      if (!isOpen) {
        openCB?.();
        return true;
      }
      return isOpen;
    });
  }, [openCB]);

  const toggle = () => {
    return open ? onClose() : onOpen();
  };

  return { open, toggle };
};
