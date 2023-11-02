import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IOption } from "../type";

interface ISelectContext {
  handleChange: (value: string) => void;
  value?: IOption | IOption[] | null;
  isOpen: boolean;
  optionPos: {
    top: number;
    left: number;
    width: number;
  };
}

const Context = createContext<ISelectContext>({
  handleChange: () => {},
  value: null,
  isOpen: false,
  optionPos: {
    top: 0,
    left: 0,
    width: 0,
  },
});

interface ISelectProvider {
  handleChange: (value: string) => void;
  children: ReactNode;
  value?: IOption | IOption[];
  isOpen: boolean;
  selectEle: RefObject<HTMLDivElement>;
}

const GAP_OPTION = 10;

export const SelectProvider = (props: ISelectProvider) => {
  const [optionPos, setOptionPost] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const selectEle = props.selectEle.current?.getBoundingClientRect();
    if (!selectEle) {
      return;
    }

    const selectHeight = selectEle?.bottom - selectEle?.top;
    setOptionPost({
      top: selectHeight + GAP_OPTION,
      left: selectEle.left,
      width: selectEle.width,
    });
  }, [props.selectEle]);

  const selectState = useMemo(
    () => ({
      handleChange: props.handleChange,
      value: props.value,
      isOpen: props.isOpen,
      optionPos,
    }),
    [optionPos, props.handleChange, props.isOpen, props.value]
  );
  return (
    <Context.Provider value={selectState}>{props.children}</Context.Provider>
  );
};

export const useSelect = () => {
  const context = useContext(Context);
  return context;
};
