import './App.css';
import { Login } from "./Component/Login";
import { Signup } from "./Component/Signup";
import Navbar from './Component/Nvabar';
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/" component={Navbar}></Route>
      </Switch>
    </div>
  );
}

export default App;
