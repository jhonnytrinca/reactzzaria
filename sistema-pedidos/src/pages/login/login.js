import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";
import { AuthContext } from "../../contexts/auth";
// eslint-disable-next-line
import FirebaseApp from "../../services/firebase";

function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container>
      <Grid container spacing={5} justifyContent={"center"}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} container justifyContent={"center"}>
          <GithubButton onClick={login}>Entrar com GitHub</GithubButton>
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
