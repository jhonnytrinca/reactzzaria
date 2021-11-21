import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import {
  Drawer as MaterialDrawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import * as routes from "../../routes";

const Orders = lazy(() => import("../orders/orders.js"));
const PizzasSizes = lazy(() => import("../pizza-sizes/pizza-sizes.js"));
const PizzasFlavours = lazy(() =>
  import("../pizza-flavours/pizza-flavours.js")
);

const Main = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Drawer variant="permanent">
        <DrawerContent>
          <Typography variant="h4">React-zzaria</Typography>
          <Typography>(sistema de cadastro)</Typography>
        </DrawerContent>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.label}
              button
              selected={pathname === item.link}
              component={Link}
              to={item.link}
            >
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Content>
        <Suspense fallback="Loading...">
          <Switch>
            {menuItems.map((item) => (
              <Route key={item.link} path={item.link} exact={item.exact}>
                <item.component />
              </Route>
            ))}
          </Switch>
        </Suspense>
      </Content>
    </>
  );
};

const Drawer = styled(MaterialDrawer)`
  && {
    .MuiPaper-root {
      width: ${({ theme }) => theme.extend.drawerWidth}px;
    }
  }
`;

const Content = styled.main`
  margin-left: ${({ theme }) => theme.extend.drawerWidth}px;
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(1)}px;
`;

const menuItems = [
  { label: "Pedidos", link: routes.HOME, component: Orders, exact: true },
  {
    label: "Tamanho de pizzas",
    link: routes.PIZZAS_SIZES,
    component: PizzasSizes,
  },
  {
    label: "Sabores de pizzas",
    link: routes.PIZZAS_FLAVOURS,
    component: PizzasFlavours,
  },
];

export default Main;
