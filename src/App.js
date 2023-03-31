import React from 'react';
import Login from './login';
import Register from './Register';
import Projects from './Projects';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Switch} from "react-router-dom";


function App() {
    return (

        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/projects" element={<Projects/>}/>

        </Routes>
    )
}

export default App;