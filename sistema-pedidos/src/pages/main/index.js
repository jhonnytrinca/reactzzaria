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
  Divider as MaterialDivider,
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
          <Title variant="h3">O que vai ser hoje, {userName}?</Title>
          <Title variant="h4">Escolha o tamanho das pizzas:</Title>
        </Grid>
        <PizzasGrid>
          {PizzaSizes.map((pizza) => (
            <Grid item key={pizza.id} xs>
              <PaperPizza>
                <Pizza>
                  <PizzaText>{pizza.size}cm </PizzaText>
                </Pizza>
                <Divider />
                <Typography variant="h5">{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {pizza.flavours}{" "}
                  {singularOrPlural(pizza.flavours, "sabor", "sabores")}{" "}
                </Typography>
              </PaperPizza>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
    </>
  );
};

function singularOrPlural(amount, singular, plural) {
  return amount === 1 ? singular : plural;
}

const PizzaSizes = [
  { id: 0, name: "Pequena", size: 28, slices: 2, flavours: 1 },
  { id: 1, name: "Média", size: 30, slices: 6, flavours: 2 },
  { id: 2, name: "Grande", size: 32, slices: 8, flavours: 3 },
];

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: "center",
})``;

const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
`;

const PaperPizza = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  min-width: 250px;
`;

const PizzaText = styled(Typography).attrs({ variant: "h5" })`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid silver;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    background: silver;
    position: absolute;
    transform: rotate(45deg);
  }

  &::before {
    height: 1px;
    width: 160px;
  }

  &::after {
    height: 160px;
    width: 1px;
  }
`;

const PizzasGrid = styled(Grid).attrs({ container: true, spacing: 16 })`
  padding: 20px;
`;

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
