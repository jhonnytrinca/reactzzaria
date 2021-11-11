import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import { ReactComponent as MainLogo } from "./logo-react-zzaria.svg";
import { AuthContext } from "../../contexts/auth";
import FirebaseApp from "../../services/firebase";

function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container>
      <Grid container spacing={40} justify={"center"}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify={"center"}>
          {/* {isUserLoggedIn && (
            <>
              <pre>{user.displayName}</pre>
              <Button variant="contained" onClick={logout}>
                Sair
              </Button>
            </>
          )} */}
          {/* {!isUserLoggedIn && ( */}
          <GithubButton onClick={login}>Entrar com GitHub</GithubButton>
          {/* )} */}
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

export default Login;
