import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product) => {
    const existItem = cartItems.find(
      (item) => item._id === product._id
    );

    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };
// Increase qty
  const increaseQty = (id) => {
  setCartItems(
    cartItems.map((item) =>
      item._id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
};
// Decrease qty
 const decreaseQty = (id) => {
  setCartItems(
    cartItems
      .map((item) =>
        item._id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter((item) => item.qty > 0)
  );
};

const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
