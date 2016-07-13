import dispatcher from "../dispatcher";

export function initiateUser(user) {
  dispatcher.dispatch({
    type: "INITIATE_USER",
    user: user,
  });
};

