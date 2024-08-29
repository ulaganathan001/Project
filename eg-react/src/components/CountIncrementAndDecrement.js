import React from "react";
import { useState } from "react";



const CountIncrementAndDecrement = () => {

    
    
    const [count, setCount] = useState(0);

 
    
    const increment=() =>{

        setCount(count+1);
         
     }
 
     const decrement=() =>{
        setCount(count-1);
         
 
     }
    
  

  
  
  

  return (
    <div>
      <h1 style={{marginLeft: "500px"}}>Counter</h1> <br/> <br/>
    <div className="counter">
    <button className="btCounter" onClick={decrement}><h2>-</h2></button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <h2>{count}</h2>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <button className="btCounter" onClick={increment}><h2>+</h2></button>
    
    </div>
  </div>
  )
  
  }
  




export default CountIncrementAndDecrement;