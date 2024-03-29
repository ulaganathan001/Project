import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { changeColor } from '../features/theme';

function ColorSecotor() {
    const dispatch=useDispatch();
    const [color,setColor] =useState('black');
  return (
    <div>
        <input type='color' style={{color:color}} onChange={e=>setColor(e.target.value)}/>
        <button onClick={()=> dispatch(changeColor(color))}>
            Change color</button>
    </div>
  )
}

export default ColorSecotor