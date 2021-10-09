import { createContext, useReducer } from "react";
import { actions, initCart } from "./cartReducer";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initCart);

  const value = {
    cart: state,
    addProduct: (payload) => {
      dispatch({ type: actions.ADD_PRODUCT, payload });
    },
    removeProduct: (payload) => {
      dispatch({ type: actions.REMOVE_PRODUCT, payload });
    },
    plusProduct: (payload) => {
      dispatch({type: actions.PLUS_AMOUNT, payload})
    },
    minusProduct: (payload) => {
      dispatch({type: actions.MINUS_AMOUNT, payload});
    }
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default Provider
