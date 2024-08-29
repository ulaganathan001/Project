import black from '../../images/black.jpg'
import blue from '../../images/blue.jpg'
import pink from '../../images/pink.jpg'
import red from '../../images/red.jpg'
import white from '../../images/white.jpg'
import yellow from '../../images/yellow.jpg'
import { ADD_TO_CART,REMOVE_ITEM,ADD_QUANTITY,SUB_QUANTITY } from '../actions/action-types/cart-actions'

const initState = {
  items: [
    { id: 1, title: 'Adidas', desc: 'Black t-shirt', price: 500, img: black },
    { id: 2, title: 'Pepejeans', desc: 'Red t-shirt', price: 800, img: red },
    { id: 3, title: 'Reebook', desc: 'Blue t-shirt', price: 700, img: blue },
    { id: 4, title: 'Nike', desc: 'Yellow t-shirt', price: 600, img: yellow },
    { id: 5, title: 'Puma', desc: 'White t-shirt', price: 860, img: white },
    { id: 6, title: 'USPolo', desc: 'Pink t-shirt', price: 990, img: pink },
  ],
  addedItems: [],
  total: 0,
  shipping: 0,
};

const cartReducer = (state = initState, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  return state;
};

export default cartReducer;
