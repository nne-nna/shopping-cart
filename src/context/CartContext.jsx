import { createContext, useContext, useState } from "react"
import { allProducts } from "../assets/data" 
import CartItem from "../components/CartItem"


const CartContext = createContext() 

export const CartProvider = ({children}) => {
    const [allItems, setAllItems] = useState([])


    const setItems = () => {
        setAllItems(allProducts)
    }

    const addToCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                if(prevItem.inCart) {
                    return prevItem
                }

                return prevItem.id === item.id ? {...prevItem, inCart: true} : prevItem
            })
        })
    }

    const removeFromCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id ? {...prevItem, inCart: false, quantity: 1} : prevItem
            })
        })
    }

    const updateQuantity = (CartItem, amount) => {
        setAllItems ((prevItems) => {
            return prevItems.map((item) => {
                return item.id === CartItem.id ? {...item, quantity: item.quantity + amount} : item 
            })
        })
    }


    return (
        <CartContext.Provider value={{allItems, setItems, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}