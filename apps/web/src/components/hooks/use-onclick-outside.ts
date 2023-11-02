import { useEffect } from "react";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: (e?: MouseEvent | TouchEvent) => void;
}

export const useOnClickOutside = (props: IProps) => {
  const { ref, handler } = props;
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el?.contains(e?.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
};
