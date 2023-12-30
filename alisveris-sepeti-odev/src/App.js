import React, { useState, createContext } from "react";
import "./styles.css";
import { Route } from "react-router-dom";

import Products from "./components/Products";
import Cart from "./components/Cart";

import { data } from "./data";

export const BooksContext = createContext();

export default function App() {
  const [state, setState] = useState(state => ({
    bookList: data,
    cart: []
  }));

  const addToCart = book =>
    setState({
      ...state,
      cart: state.cart.find(cartItem => cartItem.id === book.id)
        ? state.cart.map(cartItem =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...state.cart, { ...book, count: 1 }]
    });

  const removeFromCart = id =>
    setState({
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== id)
    });

  const increaseCount = id => {
    setState({
      ...state,
      cart: state.cart.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    });
  };

  const decreaseCount = id => {
    setState({
      ...state,
      cart: state.cart.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      )
    });
  };

  return (
    <BooksContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        increaseCount,
        decreaseCount
      }}
    >
      <div className="App">
        <h1>Kitapçı'ya Hoşgeldiniz</h1>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </BooksContext.Provider>
  );
}
