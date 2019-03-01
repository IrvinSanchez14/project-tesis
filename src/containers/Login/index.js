import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "../../components/Button";
import InputText from "../../components/InputText";

import { setUserNameLogin, loginuser, logoutUser } from "./actions";

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
  };

  appLogin = async event => {
    event.preventDefault();
    this.props.loginuser({
      email: this.state.userName,
      password: this.state.password,
    });
  };

  onInputChangeUser = event => {
    this.setState({ userName: event.target.value });
  };

  onInputChangePas = event => {
    this.setState({ password: event.target.value });
  };

  logOut = () => {
    this.props.logoutUser("adios");
  };

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.appLogin}>
          <br />
          <InputText id="email" type="text" onChange={this.onInputChangeUser} />
          <br />
          <InputText
            id="password"
            type="password"
            onChange={this.onInputChangePas}
          />
          <br />
          <Button textButton="Login" type="submit" />
          <Button textButton="Log out" type="button" onClick={this.logOut} />
        </form>
      </div>
    );
  }
}

export const actions = {
  setUserNameLogin,
  loginuser,
  logoutUser,
};

export function mapStateToProps(state, props) {
  return {
    setUserNameLogin: setUserNameLogin(state, props),
  };
}

Login.propTypes = {
  logoutUser: PropTypes.func,
  loginuser: PropTypes.func,
  setUserNameLogin: PropTypes.func,
};

export default connect(
  mapStateToProps,
  actions
)(Login);
