import React, { useState, useEffect } from 'react';
import aboutpic from '../assets/Images/Cart.gif';
import cartimage from  '../assets/Images/productImg/Almonds.jpg'

import './CartStyle.css'; // Import your CSS file

function AddtoCart() {
  const [bodyClass, setBodyClass] = useState('');
  const [listCards, setListCards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const openShopping = () => {
    setBodyClass('active');
  };

  const closeShopping = () => {
    setBodyClass('');
  };

  const products = [
    {
      id: 1,
      name: 'PRODUCT NAME 1',
      image: 'nutrition.jpg',
      price: 120000,
    },
    
    // ... (other products)
  ];

  const initApp = () => {
    products.forEach((value, key) => {
      let newListCards = [...listCards];
      newListCards[key] = { ...products[key] };
      newListCards[key].quantity = 0;
      setListCards(newListCards);
    });
  };

  const addToCard = (key) => {
    let newListCards = [...listCards];
    newListCards[key].quantity++;
    setListCards(newListCards);
    reloadCard();
  };

  const reloadCard = () => {
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value) => {
      totalPrice += value.quantity * value.price;
      count += value.quantity;
    });

    setTotalPrice(totalPrice);
    setTotalQuantity(count);
  };

  const changeQuantity = (key, quantity) => {
    let newListCards = [...listCards];

    if (quantity === 0) {
      delete newListCards[key];
    } else {
      newListCards[key].quantity = quantity;
    }

    setListCards(newListCards);
    reloadCard();
  };

  // Initial setup
  useEffect(() => {
    initApp();
  }, []);

  return (
    <div className={`App ${bodyClass}`}>
      <div className="container">
        
        <header>
          <input type="text" placeholder='Search product' />
          <div className="shopping" onClick={openShopping}>
            <img src={aboutpic} alt="Shopping Cart" />
            <span className="quantity">{totalQuantity}</span>
          </div>
        </header>
        

        
        <div className="list ">
          {products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name}  />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
            
            
          ))}

{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}

{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}

{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}

{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}

{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}


{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}


{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}


{products.map((product, key) => (
            <div key={key} className="item">
              <img src={cartimage} alt={product.name} />
              <div className="title">{product.name}</div>
              <div className="price">{product.price.toLocaleString()}</div>
              <button onClick={() => addToCard(key)}>Add To Card</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h1>Card</h1>
        <ul className="listCard">
          {listCards.map((item, key) => (
            item && (
              <li key={key}>
                <div><img src={cartimage} alt={item.name} /></div>
                <div>{item.name}</div>
                <div>{(item.price * item.quantity).toLocaleString()}</div>
                <div>
                  <button onClick={() => changeQuantity(key, item.quantity - 1)}>-</button>
                  <div className="count">{item.quantity}</div>
                  <button onClick={() => changeQuantity(key, item.quantity + 1)}>+</button>
                </div>
              </li>
            )
          ))}

{listCards.map((item, key) => (
            item && (
              <li key={key}>
                <div><img src={cartimage} alt={item.name} /></div>
                <div>{item.name}</div>
                <div>{(item.price * item.quantity).toLocaleString()}</div>
                <div>
                  <button onClick={() => changeQuantity(key, item.quantity - 1)}>-</button>
                  <div className="count">{item.quantity}</div>
                  <button onClick={() => changeQuantity(key, item.quantity + 1)}>+</button>
                </div>
              </li>
            )
          ))}

          
        </ul>
        <div className="checkOut">
          <div className="total">{totalPrice.toLocaleString()}</div>
          <div className="closeShopping" onClick={closeShopping}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddtoCart;
