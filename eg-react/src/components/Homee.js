import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartAction';
import { FaCheckCircle } from 'react-icons/fa';
import "./Shopping.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcon: false,
        };
    }
    handleClick = (id) => {
        this.props.addToCart(id);
        this.showAddedToCartIcon();
    }
    showAddedToCartIcon = () => {
        this.setState({ showIcon: true });

        setTimeout(() => {
            this.setState({ showIcon: false });
        }, 1000);
    }
    render() {
        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img style={{ height: "200px", width: "200px" }} src={item.img} alt={item.title} />
                        <br />
                        <br />
                        <span className="card-title">{item.title}</span>
                        <span to="/" style={{ color: "black" }} onClick={() => { this.handleClick(item.id) }}>
                            <br />
                            <i className="material-icons"> + </i>
                        </span>
                    </div>
                    <br />
                    <br />
                    <div className="card-content">
                        <p>{item.desc}</p>
                        <p style={{ fontSize: "16.5px", marginTop: "-10px" }}>Price:₹{item.price}</p>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                <h3 style={{ color: "#580508", fontFamily: "cursive", color: "black" }}>Our items</h3>
                <div className="box">
                    {itemList}
                </div>
                {this.state.showIcon && (
                    <div style={{ color: "black", marginTop: '-410px', marginLeft: '1320px' }}><FaCheckCircle /> Item added to cart!</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => {
            dispatch(addToCart(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
