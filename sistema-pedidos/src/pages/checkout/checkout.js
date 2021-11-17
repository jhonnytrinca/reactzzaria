import React from "react";
import styled from "styled-components";
import {
  Grid,
  Paper,
  TextField as MaterialTextField,
  Button,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Content, Title as UiTitle, OrderInfo } from "../../ui";
import { CHECKOUT_CONFIRMATION, HOME } from "../../routes";
import FooterCheckout from "./footer-checkout";
import useOrder from "../../hooks/order";

function Checkout() {
  const { order } = useOrder();

  if (!order.pizzas.length) {
    return <Redirect to={HOME} />;
  }

  return (
    <>
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
              <OrderInfo showOptions />
            </PaperContainer>
          </Grid>
        </Grid>
      </Content>

      <FooterCheckout>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={CHECKOUT_CONFIRMATION}
        >
          Confirmar pedido
        </Button>
      </FooterCheckout>
    </>
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
