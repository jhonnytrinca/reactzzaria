import React, { Suspense, lazy, useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { AuthContext } from "./contexts/auth";
import { Redirect } from "react-router";
import t from "prop-types";
import FirebaseApp from "./services/firebase";

const MainPage = lazy(() => import("./pages/main"));
const Login = lazy(() => import("./pages/login"));

function App({ location }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [didCheckUserIn, setCheckUserIn] = useState(false);
  const { isUserLoggedIn } = userInfo;

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        console.log("dados do usuário", user);
        setUserInfo({ isUserLoggedIn: true, user });
        setCheckUserIn(true);
      }
    });
  }, [setUserInfo]);

  if (!didCheckUserIn) {
    return <LinearProgress />;
  }

  if (isUserLoggedIn && location.pathname === "/login") {
    return <Redirect to="/" />;
  }

  if (!isUserLoggedIn && location.pathname !== "/login") {
    return <Redirect to="/login" />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
}

App.propTypes = {
  location: t.object.isRequired,
};

export default App;
