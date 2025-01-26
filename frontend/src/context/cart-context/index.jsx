import { createContext, useEffect, useState } from 'react';
import axios from '@/utils/axios';
import Swal from 'sweetalert2';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartTrees, setCartTrees] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartTrees?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartTrees));
    }
  }, [cartTrees]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      const storedCart = JSON.parse(ls.getItem('cart'));
      if (storedCart.length === 0) {
        ls.removeItem('cart');
      }
      setCartTrees(storedCart);
    }
  }, []);

  function addTree(treeId) {
    setCartTrees(prev => [...prev, treeId]);
  }

  function removeTree(treeId) {
    setCartTrees(prev => {
      const pos = prev.indexOf(treeId);
      if (pos !== -1) {
        const updatedCart = prev.filter((value, index) => index !== pos);

        if (updatedCart.length === 0) {
          ls?.removeItem('cart');
        }

        return updatedCart;
      }
      return prev;
    });
  }

  const removeButton = treeId => {
    setCartTrees(prevCart => {
      const updatedCart = prevCart.filter(id => id !== treeId);

      if (updatedCart.length === 0) {
        ls?.removeItem('cart');
      }

      return updatedCart;
    });
  };

  function clearCart() {
    localStorage.removeItem('cart');
    setCartTrees([]);
  }

  // Function to count occurrences of a specific tree ID in cartTrees
  const getTreeQuantity = treeId => {
    return cartTrees.filter(id => id === treeId).length;
  };

  // Calculate the total price for each item
  const getItemTotalPrice = tree => {
    const quantity = getTreeQuantity(tree._id);
    return quantity * parseFloat(tree.price.$numberDecimal);
  };

  // Calculate the overall total price
  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, tree) => {
      return total + getItemTotalPrice(tree);
    }, 0);
  };

  // Tax rate is 19%
  const TAX_RATE = 0.19;

  // Calculate the overall total price including tax
  const calculateGrandTotal = () => {
    // Calculate total price without tax
    const totalPriceWithoutTax = calculateTotalPrice();

    // Calculate tax based on the total price
    const totalTax = totalPriceWithoutTax * TAX_RATE;

    // Calculate grand total by adding total price and tax
    const grandTotal = totalPriceWithoutTax + totalTax;

    return grandTotal;
  };

  const handleAddTree = tree => {
    const treeQuantityInCart = getTreeQuantity(tree._id);
    if (treeQuantityInCart < tree.availableQuantity) {
      addTree(tree._id);
    } else {
      Swal.fire({
        text: `Cannot add more ${tree.name}. Maximum available: ${tree.availableQuantity}`,
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
        customClass: {
          confirmButton: 'sweet-alert-btn',
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cartTrees.length > 0) {
          setLoading(true);

          const response = await axios.post('/api/tree/cart', {
            ids: cartTrees,
          });

          setCartProducts(response.data);
          setLoading(false);
        } else {
          setCartProducts([]);
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cartTrees]);

  const getSelectedDataFromCart = () => {
    return cartProducts.map(tree => ({
      treeId: tree._id,
      treeName: tree.name,
      treeImage: tree.image,
      treePrice: Number(tree.price.$numberDecimal),
      qty: getTreeQuantity(tree._id),
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartTrees,
        cartProducts,
        loading,
        setCartTrees,
        addTree,
        removeTree,
        removeButton,
        clearCart,
        getTreeQuantity,
        TAX_RATE,
        getItemTotalPrice,
        calculateTotalPrice,
        calculateGrandTotal,
        handleAddTree,
        getSelectedDataFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
