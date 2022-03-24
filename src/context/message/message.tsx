import React, { useReducer } from "react";

interface IMsgCtx {
  openMsgBox: boolean;
  isMinimize: boolean;
  onOpenMsgBox: Function;
  onCloseMsgBox: Function;
  onMinimizeMsgBox: Function;
}

const INITIAL_STATE = {
  openMsgBox: false,
  isMinimize: false,
  onOpenMsgBox: () => {},
  onCloseMsgBox: () => {},
  onMinimizeMsgBox: () => {},
};

export const MsgCtx = React.createContext<IMsgCtx>({ ...INITIAL_STATE });

function MsgReducer(state: IMsgCtx, action: any) {
  const { type } = action;

  switch (type) {
    case "OPEN":
      return {
        ...INITIAL_STATE,
        openMsgBox: true,
        isMinimize: false,
      };
    case "CLOSE":
      return {
        ...INITIAL_STATE,
        openMsgBox: false,
      };
    case "MINIMIZE":
      return {
        ...INITIAL_STATE,
        openMsgBox: false,
        isMinimize: true,
      };
    default:
      return state;
  }
}

interface IMsgProviderProps {
  children: any;
}

export default function MsgProvider(props: IMsgProviderProps): any {
  const [state, dispatch] = useReducer(MsgReducer, {
    ...INITIAL_STATE,
  });

  const setters = {
    onOpenMsgBox: (): any => {
      dispatch({ type: "OPEN" });
    },

    onCloseMsgBox: (): any => {
      console.log("click close");
      dispatch({ type: "CLOSE" });
    },

    onMinimizeMsgBox: (): any => {
      console.log("click minimize");
      dispatch({ type: "MINIMIZE" });
    },
  };

  return <MsgCtx.Provider value={{ ...state, ...setters }}>{props.children}</MsgCtx.Provider>;
}
