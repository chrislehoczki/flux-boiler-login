'use strict';

import passport from "passport";
//IMPORT SCHEMA
const Todo = require('../models/todo.js');

module.exports = function (app, passport) {

	//LOGIN


	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.send('You must be logged in to access this part of the application.');
	};


	const fbookScope = [
		"public_profile",
		"email"
	];

	//FBOOK LOGIN
	app.get('/auth/facebook', function(req, res, next) {

		req.session.redirect = req.query.redirect;
  		next();

	},passport.authenticate('facebook', { scope: fbookScope }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect : '/signinfailure'}),
        	function(req, res) {
	    // Successful authentication, redirect home.
	    	//RETAIN REDIRECT IF WANT TO ADD IN A STATIC REDIRECT ROUTE FOR USERS TO RETURN TO SAME PAGE
	    	res.redirect(/*req.session.redirect || */"/dashboard");
    });



	//LOCAL

    app.post('/signup', 
    	passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/loginfailure'
    }));
    
     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signinfailure'
    }));

    
  	//SIGN IN FAILURES

  	app.route("/loginfailure")
    	.get(function (req, res) {
    		res.send({message: "There was an error when trying to add you as a user, perhaps you left a field blank?", failure: true})
    	});
    app.route("/signinfailure")
    	.get(function (req, res) {
    		res.send({message: "There was an error logging you in, please check your email and password or your social login information.", failure: true})
    	});


    //LOGOUT


    app.route('/logout')
		.get(function (req, res) {
			var url = req.query.redirect;
			req.logout();
			res.redirect(url || "/");
		});


	//REST API
	app.route("/api/todo/:_id?")
		.get(function(req, res) {

			Todo.find({}).exec(function(err, todos) {
				if (err) {
					res.send({err: err});
				}
				else {
		
					res.send(todos);
				}
			});

		})
		.post(function(req, res) {

			const title = req.body.title;
			const todoObj = new Todo({title: title, complete: false});

			todoObj.save(function(err, data) {
				if (err) res.send({err: err});
				else {
					console.log("successfully added to db", data);
  					res.send(data);
				}
	  				
			});


		}).delete(function(req, res) {

			const _id = req.params._id;

			Todo.findOneAndRemove({_id: _id}, function(err, data) {
				if (err) res.send({err: err});
				else {
					console.log("successfully removed", data);
					res.send(data);
				}
			});

		

		}).put(function(req, res) {

			let {_id, status} = req.body;
			status = JSON.parse(status);
			Todo.findOneAndUpdate({_id: _id}, {$set: {complete: status}}, {new: true}, function(err, data) {
				if (err) res.send({err: err});
				else {
					console.log("successfully updated", data);
					res.send(data);
				}


			});

		});




};