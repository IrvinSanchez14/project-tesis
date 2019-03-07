import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Welcome from "../Welcome";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
