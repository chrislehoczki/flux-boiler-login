import React from "react";

export default class Featured extends React.Component {

	constructor() {
		super();
		this.state = {
			userOK: false,
			passwordOK: false
		}
		this.sendForm = this.sendForm.bind(this);
		this.checkEmail = this.checkEmail.bind(this);
		this.addUser = this.addUser.bind(this);
		this.addPassword = this.addPassword.bind(this);
		this.confirmPassword = this.confirmPassword.bind(this);
		this.confirmName = this.confirmName.bind(this);
		this.createUserMarkup = this.createUserMarkup.bind(this);
		this.createPasswordMarkup = this.createPasswordMarkup.bind(this);
		this.createErrorMarkup = this.createErrorMarkup.bind(this);
		this.createConfirmPasswordMarkup = this.createConfirmPasswordMarkup.bind(this);
	};

    sendForm() {

      var component = this;

        //IF PASSWORDS DONT MATCH
      if (component.state.password !== component.state.confirmPassword) {
        component.setState({errorMessage: "Your passwords do not match, please check again and then submit."})
        return;
      }

      //IF PASSWORD OR USER IS NOT ENTERED CORRECTLY / ALREADY USED
      if (!component.state.emailOK || !component.state.passwordOK) {
        component.setState({errorMessage: "There are errors with your email or password. Please check again."})
        return;
      }

      //IF THERE IS NO CONFIRM PASSWORD
      if (!component.state.confirmPassword) {
        component.setState({errorMessage: "There is a problem with your password confirmation, please check again."})
        return;
      }

      if (!component.state.name) {
        component.setState({errorMessage: "You haven't submitted a username, please check again."})
        return;
      }

      //MAKE PARAMS AND SEND OFF HERE
      var url = "/signup"
      

      var username = this.state.user;
      var password = this.state.confirmPassword;
      var name = this.state.name;
      var params = "username=" + username + "&password=" + password + "&name=" + name;
      $.post(url, params, function(data) {
          if (data.failure) {
              component.setState({errorMessage: data.message})
          }
          else {
            window.location.replace("/");
          }

      });

    };

    checkEmail(e) {

        this.setState({errorMessage: ""})

        var component = this;

        var user = e.target.value;
        console.log(user);
        var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        var test = user.match(reg)
        console.log(test)

        if (!test) {
          component.setState({emailMessage: "That email address is not valid", emailValid: false});
          return;
        }
        else {
          component.setState({emailMessage: "", emailValid: true, emailOK: true});
        }

    };


    addEmail(e) {
      var user = e.target.value;
      this.setState({user: user})
    };

    addPassword(e) {
          this.setState({errorMessage: ""})
          var component = this;
          var password = e.target.value;
          this.setState({password: password}, function() {
            if (component.state.password === "") {
          component.setState({passwordMessage: "", passwordAlert: "success"})
        }
          })

        var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(.{8,})$/

        var test = password.match(regex)
        
          if (test) {
            this.setState({passwordMessage: "", passwordAlert: "success", passwordOK: true})
          }
  
          else {
            this.setState({passwordMessage: " Your password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number", passwordAlert: "warning", passwordOK: false})
         }

    };

    confirmPassword(e) {
      this.setState({errorMessage: ""})
      var component = this;
        this.setState({confirmPassword: e.target.value}, function() {
            if (component.state.password !== component.state.confirmPassword) {
              component.setState({passwordMatch: "Your passwords don't match!", confirmPasswordAlert: "warning"})
            }
            else {
              component.setState({passwordMatch: "", confirmPasswordAlert: "success"})
            }

        })

    };

    confirmName(e) {
      this.setState({name: e.target.value})
    };


    render() {

       return (
 		  <div>
        
            <h2> Sign Up  </h2>
            <a className="btn btn-social btn-facebook" href="/auth/facebook">
            <span className="fa fa-facebook"></span> Sign Up with Facebook</a>

            <h4 className="form-element"> Or Sign Up With Email </h4>

            <div className="form-group">
              <label>Name</label>
            <input type="text" onChange={this.confirmName} value={this.state.name} className="form-control" name="name" id="name"/>
            </div>

            <div className="form-group" >
              <label>Email</label>
              <input type="text" onBlur={this.addEmail}  onChange={this.checkEmail} className="form-control" name="username" id="username" />
            </div>

            {this.state.emailMessage ? <p className="alert alert-warning"> {this.state.emailMessage} </p> : null}

            <div className="form-group">
            <label>Password</label>
            <input type="password" onKeyUp={this.addPassword} className="form-control" name="password" />
            </div>

            {this.state.passwordMessage ? <p className="alert alert-warning"> {this.state.passwordMessage} </p> : null}
           


            <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" onKeyUp={this.confirmPassword} className="form-control" name="confirmpassword" id="password"/>
            
            {this.state.passwordMatch ? <p className="alert alert-warning"> {this.state.passwordMatch} </p> : null}
            
            </div>
            <button  type="submit" onClick={this.sendForm} className="btn btn-primary">Submit</button>
            
            {this.state.errorMessage ? <p className="alert alert-warning"> {this.state.errorMessage} </p> : null}
           
        
      </div>
        );
  
  
      }
}
