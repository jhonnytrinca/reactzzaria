import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Grid, Card, Typography } from "@material-ui/core";
import singularOrPlural from "../../utils/singular-or-plural";
import { HOME } from "../../routes";
import PizzaFlavours from "../../fake-data/pizzas-flavours";
import { Title, HeaderContent, PizzasGrid, Divider, CardLink } from "../../ui";

const ChoosePizzaFlavours = ({ location }) => {
  console.log(location);
  if (!location.state) {
    return <Redirect to={HOME} />;
  }
  const { flavours, id } = location.state;

  return (
    <>
      <HeaderContent>
        <Title variant="h4">
          Escolha até {flavours}{" "}
          {singularOrPlural(flavours, "sabor", "sabores")}:
        </Title>
      </HeaderContent>

      <PizzasGrid>
        {PizzaFlavours.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <Label>
                <input type="checkbox" />
                <Img src={pizza.image} alt={pizza.name} />
                <Divider />
                <Typography>{pizza.name}</Typography>
                <Typography variant="h5">{pizza.value[id]}</Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

const Img = styled.img`
  width: 200px;
`;

const Label = styled(CardLink).attrs({ component: "label" });

export default ChoosePizzaFlavours;
