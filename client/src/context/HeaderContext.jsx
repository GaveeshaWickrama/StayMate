import { createContext, useReducer } from "react";

// Create the context
export const HeaderContext = createContext();

// Define the reducer
export const HeaderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HEADER_DATA':
      console.log("SET_HEADER_DATA action:", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_PROFILE_PICTURE':
      console.log("UPDATE_PROFILE_PICTURE action:", action.payload);
      return {
        ...state,
        picture: action.payload,
      };
    default:
      return state;
  }
};

// Define the provider component
export const HeaderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HeaderReducer, {
    firstName: '',
    lastName: '',
    role: '',
    picture: '',
  });

  console.log("HeaderContext state:", state);

  return (
    <HeaderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
};
