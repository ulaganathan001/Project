import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItem,addQuantity,subtractQuantity } from './actions/cartAction';
import { SentimentDissatisfied } from '@material-ui/icons';
import Recipe from './Recipe';
import "./Shopping.css";

class Cart extends Component {
    handleRemove = (id) => {
        this.props.removeItem(id);
    }

    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    render() {
        let addedItems = this.props.items.length ? (
            this.props.items.map(item => {
                return (
                    <li className="collection-item avatar" key={item.id}>
                        <div className="item-img"><img src={item.img} alt={item.img} className="" /></div>
                        <div className="item-desc">
                            <span className="title">{item.title}</span>
                            <p>{item.desc}</p>
                            <p>Price: {item.price}$</p>
                            <p>Quantity: {item.quantity}</p>
                            <div className="add-remove">
                                <NavLink to="/cart" className="add">
                                    <i onClick={() => { this.handleAddQuantity(item.id) }}>+</i>
                                </NavLink>
                                <button className="cancel" onClick={() => { this.handleRemove(item.id) }}>cancel</button>
                                <NavLink to="/cart" className="remove">
                                    <i onClick={() => { this.handleSubtractQuantity(item.id) }}>-</i>
                                </NavLink>
                            </div>
                        </div>
                    </li>  
                );
            })
        ) : (
            <h3 style={{ marginLeft:"680px",marginTop:"-10px",fontFamily:"cursive" }}>Nothing <SentimentDissatisfied style={{ color: "red"}}/></h3>
        );
        return (
            <div className="container">
                <div className="cart">
                    <h2 style={{ marginLeft: "640px", fontFamily: "sans-serif" }}>You have ordered : </h2>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <Recipe/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)); },
        addQuantity: (id) => { dispatch(addQuantity(id)); },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
