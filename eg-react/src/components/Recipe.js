import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import "./Shopping.css";

class Recipe extends Component {
    componentWillUnmount() {
        if (this.props.shipping) {
            this.props.substractShipping();
        }
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        } else {
            this.props.substractShipping();
        }
    }

    render() {
        return (
            <div className="container-for-shipping">
                <div className="collection">
                    <li className="collection-item"></li>
                    <li className="collection-item" style={{ fontSize: "20px" ,marginLeft:"600px",marginTop:'100px'}}><b>Total: {this.props.total} $</b></li>
                </div>
                <div className="checkout">
                    <NavLink to="/shoppingHome" className="checkout">Checkout</NavLink>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total,
        shipping: state.shipping
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
