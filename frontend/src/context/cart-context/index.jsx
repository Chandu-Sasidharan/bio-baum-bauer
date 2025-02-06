import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import showAlert from '@/utils/alert';
import axios from '@/utils/axios';
import { TAX_RATE } from '@/utils/constants';

export const CartContext = createContext({});
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Local Storage Reference
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;
  // Cart item is an array of objects with treeId and quantity
  const [cartItems, setCartItems] = useState([]);
  // Cart trees is an array of tree objects
  const [cartTrees, setCartTrees] = useState([]);
  const navigate = useNavigate();

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

  // Update cartTrees on Initial Load and when cartItems change
  useEffect(() => {
    const updateCartTrees = async () => {
      if (cartItems.length > 0) {
        const response = await axios.post('/api/trees/cart', {
          ids: cartItems.map(item => item.treeId),
        });

        const updatedCartTrees = response.data.trees.map(tree => {
          const cartItem = cartItems.find(item => item.treeId === tree._id);
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

  // Add Tree to the Cart
  const addTreeToCart = newTree => {
    const existingTree = cartItems.find(tree => tree.treeId === newTree._id);

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
      // If existing tree, update the quantity
      setCartItems(prev => {
        return prev.map(tree =>
          tree.treeId === newTree._id
            ? { ...tree, quantity: tree.quantity + 1 }
            : tree
        );
      });
    } else {
      // If no existing tree, add new to the cart
      setCartItems(prev => {
        return [...prev, { treeId: newTree._id, quantity: 1 }];
      });
    }

    navigate('/cart');
  };

  // Increment tree count in the cart
  const incrementTreeCount = treeId => {
    setCartItems(prev => {
      return prev.map(tree => {
        if (tree.treeId === treeId) {
          const cartTree = cartTrees.find(t => t._id === treeId);
          if (tree.quantity < cartTree.availableQuantity) {
            return { ...tree, quantity: tree.quantity + 1 };
          } else {
            showAlert(
              'error',
              'Out of Stock!',
              `We don't have more than ${cartTree.availableQuantity} of this tree in stock.`
            );
          }
        }
        return tree;
      });
    });
  };

  // Decrement tree count in the cart
  const decrementTreeCount = treeId => {
    setCartItems(prev => {
      return prev.reduce((acc, tree) => {
        if (tree.treeId === treeId) {
          if (tree.quantity > 1) {
            // If quantity is 1, the tree will not be added to the acc
            acc.push({ ...tree, quantity: tree.quantity - 1 });
          }
        } else {
          acc.push(tree);
        }
        return acc;
      }, []);
    });
  };

  // Remove tree from the shopping cart
  const removeTreeFromCart = treeId => {
    setCartItems(prev => {
      return prev.filter(tree => tree.treeId !== treeId);
    });
  };

  // Get Tree Count by ID
  const getTreeCount = treeId => {
    const tree = cartItems.find(tree => tree.treeId === treeId);
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
  };

  // Calculate the totalPrice, totalTax and grandTotal of items in the cart
  const calculatePrice = () => {
    if (!cartTrees) return { totalPrice: 0, totalTax: 0, grandTotal: 0 };

    const totalPrice = cartTrees.reduce((acc, tree) => {
      const price = parseFloat(tree.price.$numberDecimal);
      const priceWithoutTax = price / (1 + TAX_RATE);
      return acc + priceWithoutTax * tree.quantity;
    }, 0);

    const totalTax = totalPrice * TAX_RATE;
    const grandTotal = totalPrice + totalTax;

    return {
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      totalTax: parseFloat(totalTax.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
    };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTrees,
        addTreeToCart,
        removeTreeFromCart,
        clearCartTrees,
        calculatePrice,
        getTreeCount,
        getTotalTreeCount,
        incrementTreeCount,
        decrementTreeCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
