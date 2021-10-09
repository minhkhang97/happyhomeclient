export const initCart = {
  products: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const actions = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  PLUS_AMOUNT: "PLUS_AMOUNT",
  MINUS_AMOUNT: "MINUS_AMOUNT",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT:
      if (
        state.products.filter((el) => el.id === action.payload.id).length > 0
      ) {
        const products = state.products.map((el) =>
          el.id === action.payload.id
            ? { ...el, amount: el.amount + 1 }
            : { ...el }
        );
        return { ...state, products };
      }
      return { ...state, products: [...state.products, action.payload] };
    case actions.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((el) => el.id !== action.payload),
      };
    case actions.PLUS_AMOUNT:
      console.log(action.payload.id);
      return {
        ...state,
        products: state.products.map((el) =>
          el.id === action.payload.id
            ? { ...el, amount: el.amount + 1 }
            : { ...el }
        ),
      };

      case actions.MINUS_AMOUNT:
        return {
          ...state,
          products: state.products.map((el) =>
            el.id === action.payload.id
              ? { ...el, amount: el.amount - 1 }
              : { ...el }
          ),
        };
    default:
      return state;
  }
};
