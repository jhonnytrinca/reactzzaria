import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import { ReactComponent as MainLogo } from "./logo-react-zzaria.svg";
import {
  GithubAuthProvider,
  signInWithRedirect,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import FirebaseApp from "../../services/firebase";

function Login() {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });
  const { isUserLoggedIn, user } = userInfo;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({ isUserLoggedIn: true, user: user });
      } else {
        setUserInfo({ isUserLoggedIn: false, user: null });
      }
    });
  }, []);

  const login = useCallback(() => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  }, []);

  const logout = useCallback(() => {
    signOut(auth).then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null,
      });
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={40} justify={"center"}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify={"center"}>
          {isUserLoggedIn && (
            <>
              <pre>{user.displayName}</pre>
              <Button variant="contained" onClick={logout}>
                Sair
              </Button>
            </>
          )}
          {!isUserLoggedIn && (
            <GithubButton onClick={login}>Entrar com GitHub</GithubButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

const Logo = styled(MainLogo)`
  width: 100%;
`;

const Container = styled.div`
  padding: 20px;
`;

const GithubButton = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  text-transform: none;
  font-size: 20px;
  padding: 20px;
  max-width: 480px;
`;

const auth = getAuth();

export default Login;
