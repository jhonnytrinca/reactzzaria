import React from "react";
import styled from "styled-components";
import {
  Grid,
  Paper,
  TextField as MaterialTextField,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { Content, Title as UiTitle } from "../../ui";
import useOrder from "../../hooks/order";
import { singularOrPlural } from "../../utils";

function Checkout() {
  const { order } = useOrder();

  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Title>Qual o endereço para entrega?</Title>
          <PaperContainer>
            <Grid container spacing={2}>
              <TextField label="CEP" xs={4} autoFocus></TextField>
              <Grid item xs={8} />
              <TextField label="Rua" xs={9}></TextField>
              <TextField label="Número" xs={3}></TextField>
              <TextField label="Complemento" xs={12}></TextField>
              <TextField label="Cidade" xs={9}></TextField>
              <TextField label="Estado" xs={3}></TextField>
            </Grid>
          </PaperContainer>
          <PaperContainer>
            <TextField label="Telefone" xs={4}></TextField>
          </PaperContainer>
        </Grid>

        <Grid container item xs={12} md={6} direction="column">
          <Title>Informações do seu pedido</Title>
          <PaperContainer>
            <List>
              {order.pizzas.map((pizza, index) => {
                const { PizzaFlavours, pizzaSize, quantity } = pizza;
                const { name, slices, flavours } = pizzaSize;

                return (
                  <ListItem key={index}>
                    <Typography>
                      {quantity} {singularOrPlural(quantity, "pizza", "pizzas")}{" "}
                      <b>{name.toUpperCase()}</b> {"- "}({slices}{" "}
                      {singularOrPlural(slices, "fatia", "fatias")}, {flavours}{" "}
                      {singularOrPlural(flavours, "sabor", "sabores")})
                      <br />
                      {singularOrPlural(
                        PizzaFlavours.length,
                        "no sabor",
                        "nos sabores"
                      )}{" "}
                      <b>{PizzaFlavours.map(({ name }) => name).join(", ")}</b>
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </PaperContainer>
        </Grid>
      </Grid>
    </Content>
  );
}

function TextField({ xs, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField variant="outlined" fullWidth {...props} />
    </Grid>
  );
}

const Title = styled(UiTitle).attrs({ variant: "h6" })`
  text-align: left;
`;

const PaperContainer = styled(Paper)`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default Checkout;
