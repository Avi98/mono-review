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
  toggleDeleteMemberModal: () => {},
  toggleUpdateMemberModal: () => {},
  isDeleteMemberModalOpen: false,
  isUpdateMemberModalOpen: false,
  memberName: "",
} as const;

type ContextType = Omit<typeof initialState, ""> & {
  memberName: string;
};
const MemberActionModalContext = createContext<ContextType>(initialState);

interface IModalProvider {
  children: ReactNode;
  memberName: string;
}

interface IInitialState {
  isUpdateMemberModalOpen: boolean;
  isDeleteMemberModalOpen: boolean;
}
export const MemberActionsModalProvider = (props: IModalProvider) => {
  const [modalState, setModalState] = useState<IInitialState>({
    isUpdateMemberModalOpen: false,
    isDeleteMemberModalOpen: false,
  });

  const toggleDeleteMemberModal = useCallback(() => {
    setModalState((state) => ({
      ...state,
      isDeleteMemberModalOpen: !state.isDeleteMemberModalOpen,
    }));
  }, []);

  const toggleUpdateMemberModal = useCallback(() => {
    setModalState((state) => ({
      ...state,
      isUpdateMemberModalOpen: !state.isUpdateMemberModalOpen,
    }));
  }, []);

  return (
    <MemberActionModalContext.Provider
      value={
        useMemo(
          () => ({
            toggleDeleteMemberModal,
            toggleUpdateMemberModal,
            memberName: props.memberName,
            ...modalState,
          }),
          [
            modalState,
            props.memberName,
            toggleDeleteMemberModal,
            toggleUpdateMemberModal,
          ]
        ) as ContextType
      }
    >
      {props.children}
    </MemberActionModalContext.Provider>
  );
};

export const useMemberActionModal = () => {
  const roleModalContext = useContext(MemberActionModalContext);

  return roleModalContext;
};
