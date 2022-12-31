import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Toko from "./components/Toko";
import AddProduk from "./components/AddProduk";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/home">
          <Navbar/>
          <Home/>
        </Route>
        <Route path="/toko">
          <Navbar/>
          <Toko/>
        </Route>
        <Route path="/addProduk">
          <Navbar/>
          <AddProduk/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
