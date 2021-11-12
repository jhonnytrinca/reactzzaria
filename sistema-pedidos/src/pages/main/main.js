import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import Header from "./header";

const ChoosePizzaSize = lazy(() =>
  import("../choose-pizza-size/choose-pizza-size.js")
);

const Main = () => (
  <>
    <Header />

    <Spacer />

    <Content>
      <Suspense fallback="Loading...">
        <Switch>
          <Route path="/" exact component={ChoosePizzaSize} />
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
