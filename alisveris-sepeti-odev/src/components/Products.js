import React, { useContext } from "react";
import { BooksContext } from "../App";
import { Link } from "react-router-dom";

const Cart = () => {
  const context = useContext(BooksContext);

  const handleRemoveFromCart = id => {
    context.removeFromCart(id);
  };

  const { increaseCount, decreaseCount } = context;

  const totalCartItems = context.cart.reduce(
    (total, item) => (total += item.count),
    0
  );

  const totalCartAmount = context.cart
    .reduce((total, item) => (total += item.count * item.price), 0)
    .toFixed(2);

  return (
    <div>
      <h2>
        <Link to="/">Kitap Listesi</Link>{" "}
        <span>
          Sepetim {context.cart.length > 0 ? `(${totalCartItems})` : ""}
        </span>
      </h2>
      {totalCartAmount > 0 && (
        <h3>Toplam Sepet Tutarı: &#8378;{totalCartAmount}</h3>
      )}
      {context.cart.length < 1
        ? "Sepetinizde hiç kitap yok."
        : context.cart.map(book => (
            <div key={book.id} className="book">
              <img src={book.image} alt={book.name} />
              <div>
                <h4>{book.name}</h4>
                <p>Yazar: {book.author}</p>
                <p>Fiyat: &#8378;{book.price}</p>
                <p>Toplam: &#8378;{(book.price * book.count).toFixed(2)}</p>
                <p>Sepetinizde bu kitaptan toplam {book.count} adet var.</p>
                <button onClick={() => decreaseCount(book.id)}>-</button>
                <button onClick={() => handleRemoveFromCart(book.id)}>
                  Sepetten Çıkar
                </button>
                <button onClick={() => increaseCount(book.id)}>+</button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Cart;
