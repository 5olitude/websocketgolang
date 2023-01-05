import logo from './logo.svg';

import { Route,BrowserRouter,Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import './signin'
import Signin from "./signin";
import Basic from "./basic";
import ChatBox from "./chatlist";
function App() {
  return (
    <div className="App">

        <BrowserRouter>

            <Routes>

                <Route exact path="/" element={<Signin/>}/>
                <Route exact path="/chatbox" element={<ChatBox/>}/>
                <Route  exact path="/chats" element={<Basic/>}/>
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
