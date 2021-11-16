import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Typography,
  Grid,
  Divider as MaterialDivider,
  Card,
  CardActionArea as MaterialCardActionArea,
} from "@material-ui/core";
import { AuthContext } from "../../contexts/auth";
import PizzaSizes from "../../fake-data/pizzas-sizes";
import { CHOOSE_PIZZA_FLAVORS } from "../../routes";

const ChoosePizzaSize = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Title variant="h3">
          O que vai ser hoje, {userInfo.user.firstName}?
        </Title>
        <Title variant="h4">Escolha o tamanho das pizzas:</Title>
      </Grid>

      <PizzasGrid>
        {PizzaSizes.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <CardActionArea
                to={{ pathname: CHOOSE_PIZZA_FLAVORS, state: pizza }}
              >
                <Pizza>
                  <PizzaText>{pizza.size}cm </PizzaText>
                </Pizza>
                <Divider />
                <Typography variant="h5">{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {pizza.flavours}{" "}
                  {singularOrPlural(pizza.flavours, "sabor", "sabores")}{" "}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

function singularOrPlural(amount, singular, plural) {
  return amount === 1 ? singular : plural;
}

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: "center",
})``;

const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
`;

const CardActionArea = styled(MaterialCardActionArea).attrs({
  component: Link,
})`
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
  background: white;
  z-index: 1;

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

const PizzasGrid = styled(Grid).attrs({ container: true, spacing: 2 })`
  padding: 20px;
`;

export default ChoosePizzaSize;
