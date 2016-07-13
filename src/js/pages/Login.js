import React from "react";

import * as loginActions from "../actions/loginActions";

export default class Featured extends React.Component {

    constructor() {
    	super();
    	this.state = {
    		userOK: false,
    		passwordOK: false
    	}
    	this.sendForm = this.sendForm.bind(this);
    	this.addUser = this.addUser.bind(this);
    	this.addPassword = this.addPassword.bind(this);
    	this.createErrorMarkup = this.createErrorMarkup.bind(this);
    };

    componentDidMount() {
      this.setState({stravaDirect: "/auth/strava?redirect=" + window.location.pathname, facebookDirect: "/auth/facebook?redirect=" + window.location.pathname})
    };

    sendForm() {

      var component = this;
      //MAKE PARAMS HERE
      var url = "/login"
      
      var username = this.state.user;
      var password = this.state.password;
      var params = "username=" + username + "&password=" + password;

  
      $.post(url, params, function(data) {

      	console.log(data);
          if (data.failure) {

            component.setState({errorMessage: data.message})
          }
          else {
            console.log("logged in", data)
          	//loginActions.initiateUser();
            //window.location.replace("/dashboard");
          }

      })

    };

    addUser(e) {
      var user = e.target.value;
      this.setState({user: user})

    };

    addPassword(e) {
      var password = e.target.value;
      this.setState({password: password})

    };

    createErrorMarkup(data) {
      if (!data) {
          return null;
        }
         return {__html: '<div class="alert alert-' + 'danger' + '">' + data + '</div>'};
      };

    render() {



    	var inline = {
    		display: "inline",
    	}

    	var center = {
    		textAlign: "center"
    	}

      var image = {
        width: "100px",
        height: "100px"
      }

      var form = {
        textAlign: "center"
      }


       return (
 		  <div>
        

       

        <h2> Log In </h2>  
       <div className="signup-container"> 

    <a style={{color: "white"}} className="btn btn-social btn-facebook" href={this.state.facebookDirect}>
    <span className="fa fa-facebook"></span> Login with Facebook</a>

    <h4 className="form-element"> Or Login With Email </h4>


    <div className="form-group">
      <label>Email</label>
      <input onKeyUp={this.addUser} type="text" className="form-control" name="username"/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input onKeyUp={this.addPassword} type="password" className="form-control" name="password"/>
    </div>
    <button type="submit" onClick={this.sendForm} className="btn btn-primary btn-block">Sign In</button>

    <div dangerouslySetInnerHTML={this.createErrorMarkup(this.state.errorMessage)} />

      <p className="form-element"> Not got an account yet? </p> <button onClick={this.props.changeModal} className="show-signup btn btn-secondary"> Sign Up </button>
      </div>
          
      </div>
        );
  
  
      }
}
