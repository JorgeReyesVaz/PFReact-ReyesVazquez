import { useEffect, useState, useContext, createContext } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { getFirestore,getDoc,doc } from "firebase/firestore";
import { ItemQuantitySelector } from "./ItemQuantitySelector";
import { ItemContext } from "./contexts/itemContext";
import { NavLink } from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';

export const ItemDetailContainer = () =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [items, setItems] = useState([])
    const [loading,setLoading] = useState(true)
   
   const{addItem,items2, reset} = useContext(ItemContext)
   const total = items2.reduce((acc,act)=> acc + act.price * act.quantity, 0)
    const {id} = useParams()

    useEffect(()=> {
        const db = getFirestore()

        const refDoc = doc(db,'items',id)

        getDoc(refDoc)
        .then((snapshot) => {
            setItems(
                {...snapshot.data(), id: snapshot.id}
            )
        })
        .finally(()=> setLoading(false))
    },[id])

    const onAdd = (quantity)=>{
        addItem({...items, quantity})
    }

    if (loading) return <Spinner animation="grow" />

    return (
            
        <Container style={{ display: "flex", flexWrap:"wrap", justifyContent:"space-around"}}>
        
                <section style={{ display: "flex", justifyContent:"space-around", marginTop: "20px"}}>
                    <div style={{ width: "50%"}}>
                        <img src={items.imageId} alt={items.name} style={{ width: "50%", height:"auto"}}/>
                    </div>
                    <div style={{ width: "50%"}}>
                        <h5 style={{ textAlign: "justify"}}>{items.description}</h5>
                        <p style={{ fontSize: "20px"}}>${items.price} us</p>
                        <ItemQuantitySelector stock = {items.stock} onAdd={onAdd}/>
                        <Button variant="primary" onClick={handleShow} style={{ marginLeft:"20px"}}>
                            Ver carrito
                        </Button>
                        <p style={{ paddingTop: "30px"}}>Quedan {items.stock} unidades en Stock</p>
                    </div>
                </section>

        
                <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Lista de carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Button variant="outline-danger" onClick={reset} >Vaciar Carrito</Button>
                    {items2.map((items2) =>{ 
                        return(
                            <section style={{ display: "flex", justifyContent:"space-around", marginTop: "20px"}}>
                                <div style={{ width: "50%"}}>
                                    <img src={items2.imageId} alt={items2.name} style={{ width: "50%", height:"auto"}}/>
                                </div>
                                <div style={{ width: "50%"}}>
                                    <h5 style={{ textAlign: "left"}}>{items2.name}</h5>
                                    <p style={{ fontSize: "20px"}}>${items2.price} us</p>
                                    <p style={{ paddingTop: "10px"}}>{items2.quantity} unidades</p>
                                    {/* <ItemQuantitySelector stock = {items2.stock} onAdd={onAdd}/> */}
                                </div>
                            </section>
                        )
                    })}
                    <section>
                        <h3 style={{ paddingTop: "30px", textAlign:"center"}}>Total ${total} us</h3>
                    </section>
                    <section style={{ textAlign:"center"}}>
                        <Button variant="primary" as={NavLink} to={"/cart"} >Ir al carrito</Button>
                    </section>
                </Offcanvas.Body>
                </Offcanvas>
      
        </Container>
    
)
}