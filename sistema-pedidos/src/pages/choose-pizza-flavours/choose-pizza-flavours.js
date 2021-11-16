import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Grid, Card as MaterialCard, Typography } from "@material-ui/core";
import { HOME, CHOOSE_PIZZA_QUANTITY } from "../../routes";
import PizzaFlavours from "../../fake-data/pizzas-flavours";
import {
  Title,
  HeaderContent,
  PizzasGrid,
  Divider,
  CardLink,
  Content,
  Footer,
} from "../../ui";
import { toMoney, singularOrPlural } from "../../utils";

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}));

  if (!location.state) {
    return <Redirect to={HOME} />;
  }
  const { flavours, id } = location.state.pizzaSize;

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
      <Content>
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
                  <Typography variant="h5">
                    {toMoney(pizza.value[id])}
                  </Typography>
                </Label>
              </Card>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
      <Footer
        buttons={{
          back: { children: "Mudar tamanho" },
          action: {
            to: {
              pathname: CHOOSE_PIZZA_QUANTITY,
              state: {
                ...location.state,
                PizzaFlavours: getFlavoursNameAndId(checkboxes),
              },
            },
            children: "Quantas Pizzas?",
            disabled: checkboxesChecked(checkboxes).length === 0,
          },
        }}
      />
    </>
  );
};

function checkboxesChecked(checkboxes) {
  return Object.values(checkboxes).filter(Boolean);
}

function getFlavoursNameAndId(checkboxes) {
  return Object.entries(checkboxes)
    .filter(([, value]) => !!value)
    .map(([id]) => ({
      id,
      name: PizzaFlavours.find((flavour) => flavour.id === id).name,
    }));
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
