import React from "react";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Link to="/login">Login </Link>
      </div>
    );
  }
}

export default Welcome;
