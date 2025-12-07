import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // load from localStorage on start
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // save when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book._id === book._id);
      if (existing) {
        return prev.map((item) =>
          item.book._id === book._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.book._id !== bookId));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (bookId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.book._id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.book.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
