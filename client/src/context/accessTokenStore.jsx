import { createContext, useContext, useReducer } from "react";

const accessTokenStateStore = createContext(null);
const accessTokenDispatchStore = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.value,
      };
    default:
      throw new Error("Unhandled action");
  }
};
export const AccessTokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    accessToken: "",
  });
  return (
    <accessTokenStateStore.Provider value={state}>
      <accessTokenDispatchStore.Provider value={dispatch}>{children}</accessTokenDispatchStore.Provider>
    </accessTokenStateStore.Provider>
  );
};
export const useAccessTokenState = () => {
  const state = useContext(accessTokenStateStore);
  if (!state) throw new Error("cannot find accessTokenState");
  return state;
};
export const useAccessTokenDispatch = () => {
  const dispatch = useContext(accessTokenDispatchStore);
  if (!dispatch) throw new Error("cannot find accessTokenState");
  return dispatch;
};
