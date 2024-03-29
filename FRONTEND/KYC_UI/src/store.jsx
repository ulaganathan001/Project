
import informationReducer from './features/information.js'
import {configureStore} from '@reduxjs/toolkit';

const store =configureStore({
  reducer:{
   
    information:informationReducer
    
  }
})
export default store