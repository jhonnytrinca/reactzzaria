import React, { Suspense, lazy, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { AuthContext } from "./contexts/auth";
import FirebaseApp from "./services/firebase";

const MainPage = lazy(() => import("./pages/main"));
const Login = lazy(() => import("./pages/login"));

function App() {
  const { setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        console.log("dados do usuário", user);
        setUserInfo({ isUserLoggedIn: true, user });
      } else {
        setUserInfo({ isUserLoggedIn: false, user: null });
      }
    });
  }, [setUserInfo]);

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
