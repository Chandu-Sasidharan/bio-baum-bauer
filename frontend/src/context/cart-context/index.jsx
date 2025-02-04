import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from '@/utils/axios';
import showAlert from '@/utils/alert';

export const CartContext = createContext({});
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const navigate = useNavigate();

  // Get Cart from Local Storage
  useEffect(() => {
    try {
      if (lsRef) {
        const cartData = lsRef.getItem('cart');
        if (cartData) {
          const itemsInLocalStorage = JSON.parse(cartData);
          if (Array.isArray(itemsInLocalStorage)) {
            setShoppingCart(itemsInLocalStorage);
          }
        }
      }
    } catch (error) {
      // Do nothing
    }
  }, [lsRef, setShoppingCart]);

  // Save Cart to Local Storage
  useEffect(() => {
    lsRef?.setItem('cart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  // Add tree to the shopping cart
  const addTreeToCart = newTree => {
    setShoppingCart(prev => {
      const existingTree = prev.find(tree => tree.id === newTree.id);

      if (existingTree) {
        // Check if adding another tree exceeds the available quantity
        if (existingTree.quantity < newTree.availableQuantity) {
          return prev.map(tree =>
            tree.id === newTree.id
              ? { ...tree, quantity: tree.quantity + 1 }
              : tree
          );
        } else {
          showAlert(
            'error',
            'Out of Stock',
            `You cannot add more than ${newTree.availableQuantity} of this tree to the cart.`
          );
          return prev;
        }
      } else {
        return [...prev, { ...newTree, quantity: 1 }];
      }
    });

    navigate('/cart');
  };

  // Remove tree from the shopping cart
  const removeTreeFromCart = treeId => {
    setShoppingCart(prev => {
      const updatedCart = prev.filter(tree => tree.id !== treeId);

      return updatedCart;
    });
  };

  // Get Tree Count
  const getTreeCount = treeId => {
    const tree = shoppingCart.find(tree => tree.id === treeId);
    return tree ? tree.quantity : 0;
  };

  // Clear the shopping cart
  const clearShoppingCart = () => {
    setShoppingCart([]);
  };

  // Calculate the total price of the shopping cart
  const calculateTotalPrice = () => {
    const total = shoppingCart.reduce((total, tree) => {
      const price = parseFloat(tree.price.toString());
      return total + price * tree.quantity;
    }, 0);

    return parseFloat(total.toFixed(2));
  };

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        isCartLoading,
        addTreeToCart,
        removeTreeFromCart,
        clearShoppingCart,
        calculateTotalPrice,
        getTreeCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
