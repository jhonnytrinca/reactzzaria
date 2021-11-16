import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Input as MaterialInput } from "@material-ui/core";
import { Content, HeaderContent, Title, Footer } from "../../ui";
import { HOME, CHOOSE_PIZZA_FLAVORS } from "../../routes";

const ChoosePizzaQuantity = ({ location }) => {
  if (!location.state) {
    return <Redirect to={HOME} />;
  }
  return (
    <>
      <Content>
        <HeaderContent>
          <Title variant="h4">
            Quantas pizzas você gostaria
            <br />
            de pedir, com esses sabores?
          </Title>
        </HeaderContent>
        <MainContent>
          <Input defaultValue="1" autoFocus />
        </MainContent>
      </Content>
      <Footer
        buttons={{
          back: { to: CHOOSE_PIZZA_FLAVORS, children: "Mudar sabores" },
          action: { to: HOME, children: "Finalizar compra", color: "primary" },
        }}
      />
    </>
  );
};

const Input = styled(MaterialInput).attrs({ type: "number" })`
  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export default ChoosePizzaQuantity;
