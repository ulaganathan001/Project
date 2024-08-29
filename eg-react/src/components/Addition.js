import React from "react";

const Addition = () => {
    const value1 = 10;
    const value2 = 20;
    const total = value1 + value2;
    return (
        <div>
            <h1>Addition</h1>
            <h3>{total}</h3>
        </div>
    );
}
