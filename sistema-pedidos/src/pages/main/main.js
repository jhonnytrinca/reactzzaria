import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import Header from "./header";
import { HOME, CHOOSE_PIZZA_FLAVORS } from "../../routes";

const ChoosePizzaSize = lazy(() =>
  import("../choose-pizza-size/choose-pizza-size.js")
);
const ChoosePizzaFlavors = lazy(() =>
  import("../choose-pizza-flavours/choose-pizza-flavours.js")
);

const Main = () => (
  <>
    <Header />

    <Spacer />

    <Content>
      <Suspense fallback="Loading...">
        <Switch>
          <Route path={HOME} exact component={ChoosePizzaSize} />
          <Route path={CHOOSE_PIZZA_FLAVORS} component={ChoosePizzaFlavors} />
        </Switch>
      </Suspense>
    </Content>
  </>
);

const Content = styled.main`
  padding: 20px;
`;

const style = (theme) => ({ main: theme.mixins.toolbar });

const SpacerWrapper = ({ classes }) => <div className={classes.main} />;

const Spacer = withStyles(style)(SpacerWrapper);

export default Main;
