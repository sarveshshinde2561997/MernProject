import './App.css';
import Home from "./Component/Home";
import { Login } from "./Component/Login";
import { Signup } from "./Component/Signup";
import About from "./Component/About";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/home/about" component={About}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </div>
  );
}

export default App;
