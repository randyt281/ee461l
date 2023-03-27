import React from 'react';
import Login from './login';
import Register from './Register';
import Projects from './Projects';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Switch} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/projects" exact element={<Projects/>}/>
            </Routes>
        
        </BrowserRouter>
    )
}   

export default App;