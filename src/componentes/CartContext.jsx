import { useContext, useState} from "react";
import { ItemContext } from "./contexts/itemContext";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { addDoc, getFirestore, collection } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Alert from 'react-bootstrap/Alert';

const initialValues = {
    phone:"",
    email:"",
    name:"",
    apellido:"",
} 

export const CartContext = () =>{
    const [buyer, setBuyer] = useState (initialValues)
    const {items,reset, removeItem} = useContext(ItemContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange=(ev)=>{
        setEmail2(ev.target.value)
        console.log(ev.target.value);
        setBuyer((prev) => {
            return{
                ...prev, [ev.target.name]: ev.target.value
            }
        })
        console.log(buyer.email);
        console.log(email2);
    }

    const [email1, setEmail1] = useState ("")
    const [email2, setEmail2] = useState ("")
    const [estatus, setEstatus] = useState (true)

    const review = (ev)=>{
        setEmail1(ev.target.value)
        console.log(email1,email2);
        if (email1 !== email2){
            setEstatus(true)
        }else{
            setEstatus(false)
        } 
    }

    const total = items.reduce((acc,act)=> acc + act.price * act.quantity, 0)
    
    const sendOrder = () =>{
        const fecha = Date.now();
        const hoy = new Date(fecha);
        const estado="Generada"
        const order = {
            hoy,
            estado,
            buyer,
            items,
            total,
            
        }

    const db = getFirestore()
    const orderCollection = collection(db,"orders")

    addDoc(orderCollection, order)
    .then(({id}) =>{
        if (id) {
            
          alert("Su orden: " + id + " ha sido completada correctamente") 
            
        }
    })
    .finally(()=>{
        reset()
        setBuyer(initialValues)
    })
}

    if (items.length === 0){
         return "Orden completada, por favor regresa al home"
    }
    return (
        <Container style={{ display: "flex", flexWrap:"wrap", justifyContent:"space-around"}}>
            <Button variant="outline-danger" onClick={reset} >Vaciar Carrito</Button>
            {items.map((item) =>{ 
                return(
                    <>
                    <section key={item.id} style={{ display: "flex", justifyContent:"space-around", marginTop: "20px"}}>
                        <div style={{ width: "50%"}}>
                            <img src={item.imageId} alt={item.name} style={{ width: "50%", height:"auto"}}/>
                        </div>
                        <div style={{ width: "50%"}}>
                            <CloseButton onClick={()=> removeItem(item.id)} style={{ marginLeft: "10%", marginBottom:"20px"}}/>
                            <h5 style={{ textAlign: "justify"}}>{item.name}</h5>
                            <p style={{ fontSize: "20px"}}>${item.price} us</p>
                            <p style={{ paddingTop: "10px"}}>{item.quantity} unidades</p>
                        </div>
                    </section>
                    
                    </>
                )
            })}
                    <section>
                        <h3 style={{ paddingTop: "30px", textAlign:"center"}}>Total ${total} us</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Ir a comprar
                        </Button>
                    </section>
            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirma tus datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="name" required type="text" placeholder="Escribe tu nombre" value={buyer.name} onChange={handleChange}/>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control name="apellido" type="text" placeholder="Escribe tu apellido" value={buyer.apellido} onChange={handleChange}/>
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control name="phone" type="text" placeholder="Escribe tu telefono" value={buyer.phone} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control name="email2" type="email" placeholder="name@example.com"  onChange={review}/>
                        <Form.Label>Comprueba tu correo</Form.Label>
                        <Form.Control name="email" type="email" placeholder="name@example.com" value={buyer.email} onChange={handleChange} />
                        <Form.Check
                        required
                        label="Verifica correo"
                        onChange={review}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={estatus} variant="primary" onClick={sendOrder} >Comprar</Button> 
                </Modal.Footer>
            </Modal>
        </Container>   
    )
}