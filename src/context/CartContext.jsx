import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // ==========================================
  // LOAD CART FROM LOCAL STORAGE
  // ==========================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("modzlab-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // ==========================================
  // SAVE CART TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "modzlab-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("modzlab-cart");
  };

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ==========================================
  // CART TOTAL
  // ==========================================

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) * Number(item.quantity),
      0
    );
  };

  // Keep cartTotal as a value for existing components
  const cartTotal = getCartTotal();

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        getCartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==========================================
// USE CART
// ==========================================

export function useCart() {
  return useContext(CartContext);
}