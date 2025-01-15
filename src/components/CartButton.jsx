import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from "../context/cartContext";

const CartButton = ({ item, fromCart }) => {
    const { addToCart, removeFromCart, updateQuantity } = useCart();

    if (!item.inCart) {
        return (
            <button
                type="button"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-lg px-4 py-2
                    flex items-center justify-center gap-2 transition-colors"
                onClick={() => addToCart(item)}
            >
                <Plus size={18} />
                Add to Cart
            </button>
        );
    }

    if (fromCart) {
        return (
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <button 
                        className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 
                            flex items-center justify-center transition-colors'
                        onClick={() => {
                            if (item.quantity === 1) {
                                removeFromCart(item);
                            } else {
                                updateQuantity(item, -1);
                            }
                        }}
                    >
                        <Minus size={16} />
                    </button>
                    <button 
                        className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300
                            flex items-center justify-center transition-colors'
                        onClick={() => updateQuantity(item, 1)}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <button 
                    className='w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 
                        flex items-center justify-center text-red-600 transition-colors'
                    onClick={() => removeFromCart(item)}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className='space-y-2'>
            <div className='flex items-center gap-2 justify-center'>
                <button 
                    className='w-8 h-8 rounded-lg bg-violet-100 hover:bg-violet-200 
                        flex items-center justify-center transition-colors'
                    onClick={() => {
                        if (item.quantity === 1) {
                            removeFromCart(item);
                        } else {
                            updateQuantity(item, -1);
                        }
                    }}
                >
                    <Minus size={16} className="text-violet-600" />
                </button>
                <span className='w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600'>
                    {item.quantity}
                </span>
                <button 
                    className='w-8 h-8 rounded-lg bg-violet-100 hover:bg-violet-200
                        flex items-center justify-center transition-colors'
                    onClick={() => updateQuantity(item, 1)}
                >
                    <Plus size={16} className="text-violet-600" />
                </button>
            </div>
            <button 
                className='w-full bg-red-100 hover:bg-red-200 text-red-600 rounded-lg py-1
                    flex items-center justify-center gap-1 text-sm transition-colors'
                onClick={() => removeFromCart(item)}
            >
                <Trash2 size={14} />
                Remove
            </button>
        </div>
    );
};

export default CartButton;