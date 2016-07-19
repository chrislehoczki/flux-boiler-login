import React from "react";
import { IndexLink, Link } from "react-router";

import loginStore from "../../stores/loginStore";


export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;

    const user = loginStore.getUser();
    console.log("loginstore user", user)

    const index = user ? "/dashboard" : "/";
    const indexName = user ? "Dashboard" : "Home";

    return (
      <div className="header">
        <h1> React Router Flux Boiler </h1>
        <div className="nav">

           <IndexLink to={index} activeClassName="active-link">{indexName}</IndexLink>
           {user ? <Link to="addtodo" activeClassName="active-link">Add Todo</Link> : null}
           {!user ? <Link to="login" activeClassName="active-link">Login</Link> : null}
           {!user ? <Link to="signup" activeClassName="active-link">Signup</Link> : null}
           {user ? <a href="/logout" activeClassName="active-link">Logout</a> : null}
           
        </div>
      </div>
      


    );
  }
}
