import React, { useEffect, useState } from 'react';
import { ShoppingCart as CartIcon, X, Package, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/cartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utilities/formatCurrency';

const ShoppingCart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { allItems, setLocalStorage } = useCart();

    useEffect(() => {
        const inCartItems = allItems.filter((item) => item.inCart);
        setCartItems(inCartItems?.reverse());
        const price = inCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(price);
        setLocalStorage();
    }, [allItems]);

    // Prevent body scroll when cart is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {cartItems.length !== 0 && (
                <>
                    {/* Overlay - only shows on larger screens */}
                    <div 
                        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-20
                            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                            lg:block hidden`}
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Cart Panel */}
                    <div className={`w-full lg:w-[400px] h-screen bg-white fixed top-0 transition-transform duration-300 ease-in-out z-30
                        ${isOpen ? "right-0" : '-right-full lg:-right-[400px]'}`}>
                        
                        {/* Header */}
                        <div className='h-16 lg:h-24 bg-gradient-to-r from-violet-500 to-purple-500 px-4 lg:px-6 
                            flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className='lg:hidden w-10 h-10 flex items-center justify-center text-white'
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <Package className='text-white hidden lg:block' size={24} />
                                <h1 className='text-xl lg:text-2xl font-medium text-white'>Your Cart</h1>
                            </div>
                            <button 
                                className='w-10 h-10 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors hidden lg:flex'
                                onClick={() => setIsOpen(false)}
                            >
                                <X className='text-white' size={20} />
                            </button>
                        </div>

                        {/* Back to Shopping - Mobile Only */}
                        <button
                            className='w-full py-3 border-b border-gray-200 text-violet-600 lg:hidden flex items-center justify-center gap-2'
                            onClick={() => setIsOpen(false)}
                        >
                            <ArrowLeft size={16} />
                            Continue Shopping
                        </button>

                        {/* Cart Items */}
                        <div className='h-[calc(100vh-16rem)] lg:h-[calc(100vh-24rem)] overflow-y-auto px-4 lg:px-6 py-4 space-y-4'>
                            {cartItems?.map((item) => (
                                <CartItem key={item.id} item={item} fromCart={true} />
                            ))}
                        </div>

                        <div className='absolute bottom-0 left-0 w-full bg-white border-t'>
                            <div className='px-4 lg:px-6 py-4 space-y-4'>
                                <div className='space-y-2'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className='h-px bg-gray-200' />
                                    <div className='flex justify-between font-medium text-lg'>
                                        <span>Total</span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                </div>
                                
                                <button className='w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg
                                    flex items-center justify-center gap-2 hover:opacity-90 transition-opacity'>
                                    <CreditCard size={20} />
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cart Toggle Button */}
                    <button 
                        className='fixed top-4 right-4 z-40 bg-gradient-to-r from-violet-500 to-purple-500 
                            w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity'
                        onClick={() => setIsOpen(true)}
                    >
                        <CartIcon className="text-white" size={20} />
                        <span className='absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full 
                            flex items-center justify-center text-sm font-medium text-violet-600 shadow-sm'>
                            {cartItems.length > 9 ? "9+" : cartItems.length}
                        </span>
                    </button>
                </>
            )}
        </>
    );
};

export default ShoppingCart;