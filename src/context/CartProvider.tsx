import { useReducer, useMemo, createContext, type ReactElement } from "react";

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;
export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction,
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action payload is missing in add action");
      }
      const { id, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id,
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      return {
        ...state,
        cart: [...filteredCart, { id, name, price, qty: qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action payload is missing in remove action");
      }
      const { id } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      return { ...state, cart: filteredCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action payload is missing in quantity action");
      }
      const { id, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id,
      );
      if (!itemExists) {
        throw new Error("item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = {
        ...itemExists,
        qty: qty,
      };
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("undefined Reducer action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);
  const Totalprice = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.price * cartItem.qty;
    }, 0),
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id);
    const itemB = Number(b.id);
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, Totalprice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  Totalprice: "",
  cart: [],
};
export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: React.ReactElement | React.ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
