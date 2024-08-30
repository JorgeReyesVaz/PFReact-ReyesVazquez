import { createContext, useState } from "react";

export const ItemContext = createContext();

export const Provider = ({children}) => {

    const [items,setItems] = useState([])
    const [items2,setItems2] = useState([])
    
    const reset = () => setItems([])

    const addItem = (item) => {
        const alreadyExists = items.some((i) => i.id === item.id)

        if (alreadyExists){
            const newItems = items.map((i)=> {
                if(i.id === item.id){
                    return{...i, quantity: i.quantity + item.quantity}
                }else{
                    return i
                }
            })
            setItems(newItems)
            setItems2(items)
        }else{
            setItems((prev)=> [...prev, item])
            setItems2(items)
        }
    }

    const removeItem = (id) => {
        const filter = items.filter((i)=> i.id !== id)
        setItems(filter)
        setItems2(items)
    }

    console.log(items);
    
    return (
    <ItemContext.Provider value ={{addItem, items,items2, reset, removeItem}}>{children}</ItemContext.Provider>
    )
}