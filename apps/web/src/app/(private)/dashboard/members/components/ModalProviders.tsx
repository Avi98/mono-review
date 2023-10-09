import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const initialState = {
  toggleModal: () => {},
  isOpenModal: false,
  memberName: "",
  trigger: null,
} as const;

type ContextType = Omit<typeof initialState, "trigger"> & {
  memberName: string;
};
const MemberActionModalContext = createContext<ContextType>(initialState);

interface IModalProvider {
  children: ReactNode;
  memberName: string;
}

interface IInitialState {
  isOpenModal: boolean;
}
export const ModalProvider = (props: IModalProvider) => {
  const [modalState, setModalState] = useState<IInitialState>({
    isOpenModal: false,
  });

  const toggleModal = useCallback(() => {
    setModalState((state) => ({
      ...state,
      isOpenModal: !state.isOpenModal,
    }));
  }, []);

  return (
    <MemberActionModalContext.Provider
      value={
        useMemo(
          () => ({ toggleModal, memberName: props.memberName, ...modalState }),
          [modalState, props.memberName, toggleModal]
        ) as ContextType
      }
    >
      {props.children}
    </MemberActionModalContext.Provider>
  );
};

export const useModal = () => {
  const roleModalContext = useContext(MemberActionModalContext);

  return roleModalContext;
};
