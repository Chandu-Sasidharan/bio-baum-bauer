import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import showAlert from '@/utils/alert';
import axios from '@/utils/axios';

export const CartContext = createContext({});
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Local Storage Reference
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;
  // Cart item is an array of objects with tree id and quantity
  const [cartItems, setCartItems] = useState([]);
  // Cart trees is an array of tree objects
  const [cartTrees, setCartTrees] = useState([]);
  const navigate = useNavigate();

  console.log('cartItems', cartItems);
  console.log('cartTrees', cartTrees);

  // Get CartItems from Local Storage
  useEffect(() => {
    try {
      if (lsRef) {
        const cart = lsRef.getItem('cart');
        if (cart) {
          const itemsInLocalStorage = JSON.parse(cart);
          if (Array.isArray(itemsInLocalStorage)) {
            setCartItems(itemsInLocalStorage);
          }
        }
      }
    } catch (error) {
      // Do nothing
    }
  }, [lsRef]);

  // Update cartTrees on initial load
  useEffect(() => {
    const updateCartTrees = async () => {
      if (cartItems.length > 0) {
        const response = await axios.post('/api/trees/cart', {
          ids: cartItems.map(item => item._id),
        });

        const updatedCartTrees = response.data.trees.map(tree => {
          const cartItem = cartItems.find(item => item._id === tree._id);
          return { ...tree, quantity: cartItem ? cartItem.quantity : 0 };
        });

        setCartTrees(updatedCartTrees);
      } else {
        setCartTrees([]);
      }
    };

    updateCartTrees();
  }, [cartItems]);

  // Save cartItems to Local Storage
  useEffect(() => {
    lsRef?.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add tree to the shopping cart
  const addTreeToCart = newTree => {
    const existingTree = cartItems.find(tree => tree._id === newTree._id);

    // Check if adding another tree exceeds the available quantity
    if (existingTree && !(newTree.availableQuantity > existingTree.quantity)) {
      showAlert(
        'error',
        'Out of Stock!',
        `We don't have more than ${newTree.availableQuantity} of this tree in stock.`
      );

      return;
    }

    if (existingTree) {
      setCartItems(prev => {
        return prev.map(tree =>
          tree._id === newTree._id
            ? { ...tree, quantity: tree.quantity + 1 }
            : tree
        );
      });

      return;
    }

    // If no existing tree, add a new tree to the cart
    setCartItems(prev => {
      return [...prev, { _id: newTree._id, quantity: 1 }];
    });
  };

  // Remove tree from the shopping cart
  const removeTreeFromCart = treeId => {
    setCartItems(prev => {
      return prev.filter(tree => tree.id !== treeId);
    });

    setCartTrees(prev => {
      return prev.filter(tree => tree.id !== treeId);
    });
  };

  // Get Tree Count by ID
  const getTreeCount = treeId => {
    const tree = cartItems.find(tree => tree.id === treeId);
    return tree ? tree.quantity : 0;
  };

  // Get Total Tree Count
  const getTotalTreeCount = () => {
    return cartItems.reduce((acc, tree) => {
      return acc + tree.quantity;
    }, 0);
  };

  // Clear the shopping cart
  const clearCartTrees = () => {
    setCartItems([]);
    setCartTrees([]);
  };

  // Calculate the total price of the shopping cart
  const calculateTotalPrice = () => {
    if (!cartTrees) return 0;

    const total = cartTrees.reduce((acc, tree) => {
      return acc + tree.price * tree.quantity;
    }, 0);

    return parseFloat(total.toFixed(2));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTrees,
        addTreeToCart,
        removeTreeFromCart,
        clearCartTrees,
        calculateTotalPrice,
        getTreeCount,
        getTotalTreeCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
