import { useEffect, useState } from "react";
// import data from "../data/productos.json";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import {
    getFirestore,
    getDocs,
    where,
    query,
    collection,
} from 'firebase/firestore'

export const ItemListContainer = (props) =>{
    const [items, setItems] = useState([])
    const [loading,setLoading] = useState(true)
    const {id} = useParams()

    useEffect(()=> {
        const db = getFirestore()

        const ref = !id 
        ? collection(db,'items')
        : query(collection(db,'items'), where('categoryId', '==', id))
        getDocs(ref)
        .then((snapshot) => {
            setItems(
                snapshot.docs.map((doc)=>{
                    return {id:doc.id, ...doc.data()}
                })
            )
        })
        .finally(()=> setLoading(false))
    },[id])
    if (loading) return <Spinner animation="grow" />
    return (
            
            <Container style={{ display: "flex", flexWrap:"wrap", justifyContent:"space-around"}}>
                <h1 style={{ marginBottom: '40px'}}>Los mejores productor de energías renovables</h1>
                {items.map((i) => ( 
                    <Card  key={i.id} style={{ width: '30%', justifyContent: "space-between"}}>
                    <Card.Img variant="top" src={i.imageId} style={{ width: '100%', height: "250px"}}/>
                    <Card.Body>
                        <Card.Title style={{ height: "52px"}}>{i.name}</Card.Title>
                        <Card.Text style={{ height: "80px"}}>
                        {i.description}
                        </Card.Text>
                        <Card.Text >
                        ${i.price} us
                        </Card.Text>
                        <Button as={NavLink} to={`/item/${i.id}`} variant="primary">Más Información</Button>
                    </Card.Body>
                    </Card>
                
                ))}
            </Container>
        
    )

    // useEffect(()=> {
    //     new Promise((resolve,reject) => setTimeout(resolve(data.items),2000))
    //     .then((response)=> {
    //         if(!id){
    //             setItems(response)
    //         } else{
    //             const filtered = response.filter((i) => i.category === id);
    //             setItems(filtered)
    //         }
    //     })
    //     .finally(()=> setLoading(false))
    // },[id])
    // if (loading) return <Spinner animation="grow" />
    // return (
            
    //         <Container style={{ display: "ruby-text"}}>
    //             <h1 style={{ marginBottom: '40px'}}>Los mejores productor de energías renovables</h1>
    //             {items.map((i) => ( 
    //                 <Card  key={i.id} style={{ width: '30%', justifyContent: "space-between"}}>
    //                 <Card.Img variant="top" src={i.image} style={{ width: '100%', height: "250px"}}/>
    //                 <Card.Body>
    //                     <Card.Title style={{ height: "52px"}}>{i.name}</Card.Title>
    //                     <Card.Text style={{ height: "80px"}}>
    //                     {i.description}
    //                     </Card.Text>
    //                     <Card.Text >
    //                     ${i.price} us
    //                     </Card.Text>
    //                     <Button as={NavLink} to={`/item/${i.id}`} variant="primary">Más Información</Button>
    //                 </Card.Body>
    //                 </Card>
                
    //             ))}
    //         </Container>
        
    // )
    
}

