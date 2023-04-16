import './App.css';
import CreateProject from './CreateProject';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import JoinProject from './JoinProject';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/createproject" element={<CreateProject/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/joinproject" element={<JoinProject/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
