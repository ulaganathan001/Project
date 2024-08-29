import React, { useState } from "react";
import "./Accordion.css";
import ListOfUsers from "./ListOfUsers";

function Accordion() {
  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(!show);
  };

  return (
    <div className="app">
      <div className="accordian">
        <div className="accordian-header" onClick={handleOpen}>
          <div>ACCORDION HEADER</div>
          <div className="sign">{show ? '-' : '+'}</div>
        </div>
        {show && (
          <div className="accordian-body">
         The accordion component allows the user to show and hide sections of related content on a page.
         <ListOfUsers />
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;