import React from 'react';
import CartButton from './CartButton';
import { formatCurrency } from '../utilities/formatCurrency';

const CartItem = ({ item, fromCart }) => {
    const { id, name, imageUrl, price, quantity } = item;

    if (fromCart) {
        return (
            <div className='flex items-center gap-4 bg-white rounded-lg p-3 border border-gray-200'>
                <div className='w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100'>
                    <img 
                        src={imageUrl} 
                        alt={name}
                        className='w-full h-full object-contain'
                    />
                </div>
                <div className='flex-1 min-w-0'>
                    <h3 className='text-sm font-medium text-gray-900 truncate'>{name}</h3>
                    <p className='text-sm text-gray-500 mt-1'>Qty: {quantity}</p>
                    <p className='text-sm font-medium text-violet-600 mt-1'>{formatCurrency(price)}</p>
                </div>
                <CartButton item={item} fromCart={fromCart} />
            </div>
        );
    }

    return (
        <div className='group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200'>
            <div className='aspect-square relative bg-gray-100 rounded-t-xl overflow-hidden'>
                <img 
                    src={imageUrl} 
                    alt={name}
                    className='w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300'
                />
            </div>
            <div className='p-4 border-t border-gray-100'>
                <h3 className='text-lg font-medium text-gray-900 truncate'>{name}</h3>
                <p className='text-lg font-medium text-violet-600 mt-1'>{formatCurrency(price)}</p>
                <div className='mt-4'>
                    <CartButton item={item} fromCart={fromCart} />
                </div>
            </div>
        </div>
    );
};

export default CartItem;