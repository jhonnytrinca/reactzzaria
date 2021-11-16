import React, { useContext } from "react";
import styled from "styled-components";
import { Typography, Grid, Card } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth";
import PizzaSizes from "../../fake-data/pizzas-sizes";
import { CHOOSE_PIZZA_FLAVORS } from "../../routes";
import singularOrPlural from "../../utils/singular-or-plural";
import { Title, HeaderContent, PizzasGrid, Divider, CardLink } from "../../ui";

const ChoosePizzaSize = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <HeaderContent>
        <Title variant="h3">
          O que vai ser hoje, {userInfo.user.firstName}?
        </Title>
        <Title variant="h4">Escolha o tamanho das pizzas:</Title>
      </HeaderContent>

      <PizzasGrid>
        {PizzaSizes.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <CardLink to={{ pathname: CHOOSE_PIZZA_FLAVORS, state: pizza }}>
                <Pizza>
                  <PizzaText>{pizza.size}cm </PizzaText>
                </Pizza>
                <Divider />
                <Typography variant="h5">{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {pizza.flavours}{" "}
                  {singularOrPlural(pizza.flavours, "sabor", "sabores")}{" "}
                </Typography>
              </CardLink>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

const PizzaText = styled(Typography).attrs({ variant: "h5" })`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid ${({ theme }) => theme.palette.grey.A100};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.palette.common.white};
  z-index: 1;

  &::before,
  &::after {
    content: "";
    background: ${({ theme }) => theme.palette.grey.A100};
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

export default ChoosePizzaSize;
