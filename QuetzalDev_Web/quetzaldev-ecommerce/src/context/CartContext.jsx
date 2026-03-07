import { createContext, useState, useContext } from "react";

// Creamos el contexto
const CartContext = createContext();

// Creamos el proveedor que envolverá nuestra app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificamos si ya está en el carrito para no duplicarlo (asumiendo que es 1 licencia por cliente)
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  // Función para eliminar un item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito (se usa al terminar la compra)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);
