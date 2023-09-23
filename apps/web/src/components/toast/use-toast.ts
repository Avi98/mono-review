import React from "react";

const MAX_TOAST = 1;
const MAX_DURATION_FOR_TOAST = 1000;

type ToastPayloadType = {
  id?: string;
  title?: string | React.ReactNode;
  desc: string | React.ReactNode;
  action?: React.ReactNode;
  variant: "success" | "info" | "error";
};

const actionsType = {
  UPDATE_TOAST: "UPDATE_TOAST",
  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
} as const;

type ActionType =
  | {
      type: (typeof actionsType)["ADD_TOAST"];
      toast: ToastPayloadType;
    }
  | {
      type: (typeof actionsType)["UPDATE_TOAST"];
      toast: Partial<ToastPayloadType>;
    }
  | {
      type: (typeof actionsType)["REMOVE_TOAST"];
      toastId: ToastPayloadType["id"];
    }
  | {
      type: (typeof actionsType)["DISMISS_TOAST"];
      toastId: ToastPayloadType["id"];
    };

type State = ToastPayloadType[];
const removeToastQueue = new Map<string, number>();

function pushTimer(toast: ToastPayloadType) {
  if (toast.id && removeToastQueue.has(toast.id)) {
  }
}

let count = 0;

function getId() {
  return (count = (count + 1) % Number.MAX_SAFE_INTEGER);
}

let state: State = [];
let listeners: Array<(state: State) => void> = [];
const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "ADD_TOAST":
      return (state = [action.toast, ...state].slice(0, MAX_TOAST));
    case "DISMISS_TOAST":
      {
        if (action.toastId) {
          //push to removeToastQueue
        }
      }
      return state;
    case "UPDATE_TOAST":
      return (state = state.map((toast) =>
        action.toast.id === toast.id ? { ...toast, ...action.toast } : toast
      ));
    case "REMOVE_TOAST": {
      if (action.toastId) {
        return (state = state.filter((t) => t.id !== action.toastId));
      }
      return (state = []);
    }
    default:
      throw new Error("Unknown toast action type");
  }
};

function dispatch(action: ActionType) {
  state = reducer(state, action);
  listeners.forEach((listener) => {
    listener(state);
  });
}

type Toast = Omit<ToastPayloadType, "id" | "variant"> & {
  variant?: ToastPayloadType["variant"];
};

export function toast(toast: Toast) {
  const id = getId().toString();
  dispatch({
    type: "ADD_TOAST",
    toast: {
      id: id,
      desc: toast.desc,
      action: toast.action,
      title: toast.title,
      variant: toast.variant || "info",
    },
  });

  const updateToast = (toast: ToastPayloadType) =>
    dispatch({ type: "UPDATE_TOAST", toast });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  return {
    dismiss,
    id,
    updateToast,
  };
}

export const useToast = () => {
  const [toastState, setToastState] = React.useState(state);

  React.useEffect(() => {
    listeners.push(setToastState);
    return () => {
      const index = listeners.indexOf(setToastState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: toastState,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
};
