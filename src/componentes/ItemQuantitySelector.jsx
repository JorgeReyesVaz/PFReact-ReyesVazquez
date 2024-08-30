import { useState } from "react";
import Button from 'react-bootstrap/Button';

export const ItemQuantitySelector = ({stock, onAdd}) => {

    const [quantity, setQuantity] = useState(1)

    
    const handleIncrease = () => {
        console.log(stock);
        if (quantity < stock)  setQuantity((prev)=> prev+1)
        
    }

    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev)=> prev-1)
    }

    const handleAdd = () => {
       onAdd(quantity)
       setQuantity(1)
    }

    return(
    <>
        <Button variant="primary" onClick={handleIncrease}>+</Button>
        <span style={{color:"black", padding:"10px"}}> {quantity} </span>
        <Button variant="primary" onClick={handleDecrease}>-</Button>
        <br />
        <br />
        <Button variant="outline-primary" onClick={handleAdd}>Agregar al carrito</Button>
    </>
    )
}