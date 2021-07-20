import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import sortComponent from "./components/sortComponent";
import cryptoComponent from "./components/cryptoComponent";
import parserComponent from "./components/parserComponent";
import calculationComponent from "./components/additionComponent";
function App() {


    return(
        <div className="App">
          <header className="App-header">
            <h1>Webassembly Performance Test</h1>
          </header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/sortAlg">Sorting Algorithm<span className="sr-only"></span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/parser">Parser Example</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cryptoAlg">Kryptographic Algorithm</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/addAlg">Addition Algorithm</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className={"mainContent"}>
            <Router>
              <Switch>
                <Route path="/sortAlg" component={sortComponent} />
                <Route path="/parser" component={parserComponent} />
                <Route path="/cryptoAlg" component={cryptoComponent} />
                <Route path="/addAlg" component={calculationComponent} />
              </Switch>
            </Router>
          </div>
        </div>
    );


}

export default App;
