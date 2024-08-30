import * as React from "react";
import './App.css'
import { ItemListContainer } from './componentes/ItemListContainer'
import { ItemDetailContainer } from "./componentes/ItemDetailContainer";
import { NotFound } from "./componentes/NotFound";

import {Navbar1} from './componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./componentes/contexts/itemContext";
import { CartContext } from "./componentes/CartContext";

function App() {
  
  return (

      <Provider>
        <BrowserRouter>
          <Navbar1/>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:id" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<CartContext />} />
              <Route path="*" element={<NotFound />} />
            </Routes>  
        </BrowserRouter>
      </Provider>
  
  )
}

export default App
