import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import AddTodo from "./pages/AddTodo";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


	import loginStore from "./stores/loginStore";

function requireAuth(nextState, replaceState) {

	const user = loginStore.getUser();
	console.log("REQUIRE AUTH USER", user)
    if (!user) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
}


export default (
  	<Route path="/" component={Layout}>
      	<IndexRoute component={Home}></IndexRoute>
     	<Route path="addtodo" component={AddTodo}></Route>
     	<Route path="dashboard" component={Dashboard}></Route>
     	<Route path="login" component={Login}></Route>
     	<Route path="signup" component={Signup}></Route>
   	</Route>
);
