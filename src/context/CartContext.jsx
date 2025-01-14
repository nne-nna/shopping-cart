import { createContext, useContext, useState } from "react";
import { allProducts } from "../assets/data"; 
import { 
    getItemFromStorage, 
    getParsedItemFromStorage, 
    setItemInStorage 
} from "../utilities/localStorageFns";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [allItems, setAllItems] = useState([]);

    const setItems = () => {
        setAllItems(allProducts);
    };

    const addToCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id
                    ? { ...prevItem, inCart: true, quantity: 1 }
                    : prevItem;
            });
        });
    };

    const removeFromCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id
                    ? { ...prevItem, inCart: false, quantity: 1 }
                    : prevItem;
            });
        });
    };

    const updateQuantity = (CartItem, amount) => {
        setAllItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id === CartItem.id
                    ? { ...item, quantity: item.quantity + amount }
                    : item;
            });
        });
    };

    const setLocalStorage = () => {
        if (allItems.length !== 0) {
            const inCartItems = allItems.filter((item) => item.inCart);
            setItemInStorage("cartItems", inCartItems);
        }
    };

    const setCartItemsFromStorage = () => {
        const storageItems = getParsedItemFromStorage("cartItems") || []; 

        if (Array.isArray(storageItems)) {
            setAllItems((prevItems) => {
                return prevItems.map((item) => {
                    const matchedItem = storageItems.find(
                        (storageItem) => storageItem.id === item.id
                    );

                    return matchedItem ? matchedItem : item;
                });
            });
        } else {
            console.error("Cart items in localStorage are not an array:", storageItems);
        }
    };

    return (
        <CartContext.Provider
            value={{
                allItems,
                setItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                setLocalStorage,
                setCartItemsFromStorage,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
