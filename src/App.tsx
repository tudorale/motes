import React, {Suspense} from 'react';
import "./style/css/main.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main"

function App() {
  
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <div className="website">
        <Router>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;