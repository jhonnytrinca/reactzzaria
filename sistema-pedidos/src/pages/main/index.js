import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar as MaterialToolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
  withStyles,
  Paper,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";
import { AuthContext } from "../../contexts/auth";

const Main = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const { userInfo, logout } = useContext(AuthContext);
  const userName = userInfo.user.displayName.split(" ")[0];

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
  };

  const handleClose = (e) => {
    setAnchorElement(null);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <Typography color="inherit">Olá, {userName}!</Typography>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            open={!!anchorElement}
            onClose={handleClose}
            anchorEl={anchorElement}
          >
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Spacer />

      <Content>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h3">O que vai ser hoje, {userName}?</Typography>
          <Typography variant="h4">Escolha o tamanho das pizzas:</Typography>
        </Grid>
        <Grid container spacing={16}>
          {PizzaSizes.map((pizza) => (
            <Grid item key={pizza.id} xs={4}>
              <Paper style={{ padding: 20 }}>
                <div>{pizza.size}cm</div>
                <Typography>{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {pizza.flavours} sabores
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Content>
    </>
  );
};

const PizzaSizes = [
  { id: 0, name: "Pequena", size: 28, slices: 2, flavours: 1 },
  { id: 1, name: "Média", size: 30, slices: 6, flavours: 2 },
  { id: 2, name: "Grande", size: 32, slices: 8, flavours: 3 },
];

const Toolbar = styled(MaterialToolbar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  height: 50px;

  & path {
    fill: white;
  }

  & line {
    stroke: white;
  }
`;

const Content = styled.main`
  padding: 20px;
`;

const style = (theme) => ({ main: theme.mixins.toolbar });

const SpacerWrapper = ({ classes }) => <div className={classes.main} />;

const Spacer = withStyles(style)(SpacerWrapper);

export default Main;
