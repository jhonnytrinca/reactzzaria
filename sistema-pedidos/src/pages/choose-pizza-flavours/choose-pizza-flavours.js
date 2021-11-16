import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Grid, Card as MaterialCard, Typography } from "@material-ui/core";
import singularOrPlural from "../../utils/singular-or-plural";
import { HOME } from "../../routes";
import PizzaFlavours from "../../fake-data/pizzas-flavours";
import { Title, HeaderContent, PizzasGrid, Divider, CardLink } from "../../ui";

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}));

  if (!location.state) {
    return <Redirect to={HOME} />;
  }
  const { flavours, id } = location.state;

  const handleChangeCheckbox = (pizzaId) => (e) => {
    if (
      checkboxesChecked(checkboxes).length === flavours &&
      e.target.checked === true
    ) {
      return;
    }

    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: e.target.checked,
      };
    });
  };

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
            <Card checked={!!checkboxes[pizza.id]}>
              <Label>
                <Checkbox
                  checked={!!checkboxes[pizza.id]}
                  onChange={handleChangeCheckbox(pizza.id)}
                />
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

function checkboxesChecked(checkboxes) {
  return Object.values(checkboxes).filter(Boolean);
}

const Card = styled(MaterialCard)`
  border: 2px solid transparent;
  border-color: ${({ theme, checked }) =>
    checked ? theme.palette.secondary.light : ""};
`;

const Img = styled.img`
  width: 200px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Label = styled(CardLink).attrs({ component: "label" })``;

export default ChoosePizzaFlavours;
