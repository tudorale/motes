import React, {Suspense} from 'react';
import "./style/css/main.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main"
import Mote from "./components/Mote"
import About from "./components/About"

function App() {
  
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <div className="website">
        <Router>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/mote/:key" exact component={Mote} />
            <Route path="/about" exact component={About} />

          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;