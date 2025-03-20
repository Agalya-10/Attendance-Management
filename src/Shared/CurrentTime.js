import { useReducer, useEffect } from "react";

const initialState = { currentTime: new Date() };

const timeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIME":
      return { ...state, currentTime: new Date() };
    default:
      return state;
  }
};

export const useTime = () => {
  const [state, dispatch] = useReducer(timeReducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_TIME" });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state.currentTime;
};
