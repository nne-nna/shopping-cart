import { useEffect } from 'react';
import CartItem from './components/CartItem';
import ShoppingCart from './components/ShoppingCart';
import { useCart } from './context/cartContext';
import { getItemFromStorage, getParsedItemFromStorage } from './utilities/localStorageFns';

const App = () => {
  const {allItems, setItems, setCartItemsFromStorage} = useCart();

  useEffect(() => {
    setItems();

    if(
      getParsedItemFromStorage("cartItems")?.length !== 0 && 
      getItemFromStorage("cartItems") !== null
    ) {
      setCartItemsFromStorage();
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl md:text-5xl font-medium text-gray-900 text-center mb-16'>
          Everything You Love in One Place 
        </h1>
        <ShoppingCart />
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {allItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
