import {
  ThemeProvider,
  createTheme,
  ListItemSecondaryAction,
} from "@mui/material";
import React, { createContext, useReducer, useState } from "react";

export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  const reducer = (state, action) => {
    const { type, payload } = action;

    const isCart = state.items.find((item) =>
      item.id === payload.id ? true : false
    );

    switch (type) {
      case "add":
        return {
          ...state,
          items: isCart
            ? state.items.map((item) =>
                item.id === payload.id ? { ...item, qty: item.qty + 1 } : item
              )
            : [...state.items, { ...payload, qty: 1 }],
        };

      case "remove":
        return {
          // items: [state.items.map((item) => item.id !== payload.id)],
          ...state,items:state.items.filter((item) => item.id !== payload.id)
        };
      default:
        return state;
    }
  };

  const [cart, dispatch] = useReducer(reducer, { items: [] });

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const AppTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleMode,
        user,
        setUser,
        cart,
        dispatch,
      }}
    >
      <ThemeProvider theme={AppTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
