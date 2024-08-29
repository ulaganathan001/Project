import React, { useState } from 'react';
import Filter from './Filter';
import CountIncrementAndDecrement from './CountIncrementAndDecrement';
import ListOfUsers from './ListOfUsers';
import Accordion from './Accordion';
function SideMenu({authToken,setAuthToken,setIsSignedIn}) {
  const [activeComponent, setActiveComponent] = useState('Filter');

  return (
    <div className="side-menu">
      {/* <ul className='sMenu-Ul'> 
        <li className='sMenu-li' onClick={() => setActiveComponent('Filter')}><NavLink>Search</NavLink></li>
        <li className='sMenu-li' onClick={() => setActiveComponent('ListOfUsers')}><NavLink>RegisteredUsers</NavLink></li>
        <li className='sMenu-li' onClick={() => setActiveComponent('Accordion')}><NavLink>Accordion</NavLink></li>
        <li className='sMenu-li' onClick={() => setActiveComponent('CountIncrementAndDecrement')}><NavLink>Counter</NavLink></li>

      </ul> */}
      <a href='#' onClick={() => setActiveComponent('Filter')}>Search</a>
      <a href='#' onClick={() => setActiveComponent('ListOfUsers')}>RegisteredUsers</a>
      <a href='#' onClick={() => setActiveComponent('Accordion')}>Accordion</a>
      <a href='#' onClick={() => setActiveComponent('CountIncrementAndDecrement')}>Counter</a>
      {activeComponent === 'Filter' && <Filter authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>}
      {activeComponent === 'ListOfUsers' && <ListOfUsers authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>}
      {activeComponent === 'Accordion' && <Accordion />}
      {activeComponent === 'CountIncrementAndDecrement' && <CountIncrementAndDecrement />}

    </div>
  );
}

export default SideMenu;
