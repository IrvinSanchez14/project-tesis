import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "../../components/Button";
import InputText from "../../components/InputText";

import api from "../../api";

import { setUserNameLogin } from "./actions";

class Login extends React.Component {
  appLogin = e => {
    const userName = "irvin@irvin.com";
    this.props.setUserNameLogin(userName);
    const data = {
      email: "irvin@irvin.com",
      password: "1234",
    };
    api.post("/login.php", {
      params: data,
    }).then((data) =>
      console.log(data)
    );
    e.preventDefault();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        Login
        <form onSubmit={this.appLogin}>
          <br />
          <InputText id="email" type="text" defaultValue="irvin@irvin.com" />
          <br />
          <InputText id="password" type="password" defaultValue="1234" />
          <br />
          <Button textButton="Login" type="submit" />
        </form>
      </div>
    );
  }
}

export const actions = {
  setUserNameLogin,
};

export function mapStateToProps(state, props) {
  return {
    setUserNameLogin: setUserNameLogin(state, props),
  };
}

Login.propTypes = {
  setUserNameLogin: PropTypes.func,
};

export default connect(
  mapStateToProps,
  actions
)(Login);
