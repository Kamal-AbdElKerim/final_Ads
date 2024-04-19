import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes ,Route} from 'react-router-dom';


import { router } from "./router/index";


function App() {
  return (
    <div>
  <RouterProvider router={router} />
  </div>
  )
}

export default App;
