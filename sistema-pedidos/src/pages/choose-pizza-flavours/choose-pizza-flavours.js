import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import {
  Grid,
  Card as MaterialCard,
  Typography,
  Container,
  Button as MaterialButton,
} from "@material-ui/core";
import { HOME, CHOOSE_PIZZA_QUANTITY } from "../../routes";
import PizzaFlavours from "../../fake-data/pizzas-flavours";
import {
  Title,
  HeaderContent,
  PizzasGrid,
  Divider,
  CardLink,
  Content,
} from "../../ui";
import { toMoney, singularOrPlural } from "../../utils";
import { AuthContext } from "../../contexts/auth";

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}));
  const { userInfo } = useContext(AuthContext);

  if (!location.state) {
    return <Redirect to={HOME} />;
  }
  const { flavours, id, name, slices } = location.state;

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
      <Footer>
        <Container>
          <Grid container>
            <OrderContainer>
              <Typography>
                <b>{userInfo.user.firstName}, seu pedido é:</b>
              </Typography>
              <Typography>
                Pizza <b>{name.toUpperCase()}</b> - ({slices} fatias, {flavours}{" "}
                {singularOrPlural(flavours, "sabor", "sabores")})
              </Typography>
            </OrderContainer>
            <Grid item>
              <Button to={HOME}>Mudar tamanho</Button>
              <Button to={CHOOSE_PIZZA_QUANTITY} color="primary">
                Quantas Pizzas?
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Footer>
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

const Footer = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`;

const OrderContainer = styled(Grid).attrs({ item: true })`
  flex-grow: 1;
`;

const Button = styled(MaterialButton).attrs({
  variant: "contained",
  component: Link,
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export default ChoosePizzaFlavours;
