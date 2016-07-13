import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.user = false;
  };

  getUser() {
    console.log("calling get user at store");
    let user = this.user ? this.user : null;

    return user;
    
  };

  getUserName() {
    let user = this.user ? this.user : null;

    if (!user) {
      return null;
    }

    let mainData = this.user.facebook ? this.user.facebook : this.user.local;
    console.log("this is user data", mainData)
   
    return mainData.firstName;

  };
  

 handleActions(action) {
    switch(action.type) {
      case "INITIATE_USER": {
        console.log("calling initiate user");
        
        this.user = action.user;
        break;
      };
    };
  };

};

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));


export default loginStore;