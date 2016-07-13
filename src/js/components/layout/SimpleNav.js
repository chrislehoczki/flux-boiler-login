import React from "react";
import { IndexLink, Link } from "react-router";



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

    return (
      <div className="header">
        <h1> React Router Flux Boiler </h1>
        <div className="nav">
           <IndexLink to="/" activeClassName="active-link">Home</IndexLink>
           <Link to="addtodo" activeClassName="active-link">Add Todo</Link>
           <Link to="login" activeClassName="active-link">Login</Link>
           <Link to="signup" activeClassName="active-link">Signup</Link>
           <a href="/logout" activeClassName="active-link">Logout</a>
        </div>
      </div>
      


    );
  }
}
