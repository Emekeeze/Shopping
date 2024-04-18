import React, { useState, useEffect } from 'react';
import './App.css';
import Grocery from "./assets/grocery-cart.png";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);
const [isCompleted, setIsCompleted] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    setIsCompleted(determineCompleteStatus());
  }, [groceryItems]);

  const handleAddGroceryItem = () => {
    if (inputValue.trim() !== '') {
      // Check if the item already exists in the list
      const existingItemIndex = groceryItems.findIndex(item => item.name.toLowerCase() === inputValue.toLowerCase());
      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity by incrementing
        const updatedItems = [...groceryItems];
        updatedItems[existingItemIndex].quantity += 1;
        setGroceryItems(updatedItems);
      } else {
        // If the item doesn't exist, add it to the list
        setGroceryItems(prevItems => [...prevItems, { name: inputValue, quantity: 1, completed: false }]);
      }
      setInputValue('');
    }
  };
  

  const handleRemove = (index) => {
    setGroceryItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  const handleCompleteStatus = (status, index) => {
    setGroceryItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].completed = status;
      return updatedItems;
    });
  };

  const determineCompleteStatus = () => {
    if (!groceryItems.length) {
      return false; // If the list is empty, it's not completed
    }
  
    let isAllCompleted = true;
    groceryItems.forEach(item => {
      if (!item.completed) {
        isAllCompleted = false;
      }
    });
  
    return isAllCompleted;
  };
  

  return (
    <main className="App"> 
      <div>
        <div>
        {isCompleted && <h4 className='success'>Done Shopping</h4>}
          <div className='set'>
          
          </div>
          <div className='header'>
            <h1>Shopping List</h1>
            <img src={Grocery} alt='image of cart' />
            <div className="input-container">
              <input
                type='text'
                placeholder='Add item'
                onChange={handleChange}
                value={inputValue}
              />
              <button className='button-add' onClick={handleAddGroceryItem}>Add</button>
            </div>
          </div>
        </div>
        <ul>
  {groceryItems.map((item, index) => (
    <li key={index}>
      <div className='container'>
        <input
          type='checkbox'
          onChange={(e) => handleCompleteStatus(e.target.checked, index)}
          checked={item.completed}
        />
        <p>{item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</p> {/* Render quantity only if it's greater than 1 */}
      </div>
      <div className='remove-button' onClick={() => handleRemove(index)}>x</div>
    </li>
  ))}
</ul>

      </div>
    </main>
  );
}

export default App;
