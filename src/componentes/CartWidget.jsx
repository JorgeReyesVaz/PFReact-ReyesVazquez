import cart from '../assets/cart.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from './contexts/itemContext';

export const CartWidget = () => {
    const {items}= useContext(ItemContext)

    const quantity = items.reduce((acc,act) => acc + act.quantity,0)
    return (
        <Link to="/cart">
            <img src={cart} alt="imagen carrito de compras" height={28} /> <span style={{paddingRight: "30px"}}>{quantity}</span>  
        </Link>
    );
} 
