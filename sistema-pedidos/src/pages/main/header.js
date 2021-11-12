import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar as MaterialToolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { AuthContext } from "../../contexts/auth";
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const [anchorElement, setAnchorElement] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
  };

  const handleClose = (e) => {
    setAnchorElement(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Typography color="inherit">Olá, {userInfo.user.firstName}!</Typography>
        <IconButton color="inherit" onClick={handleOpenMenu}>
          <AccountCircle />
        </IconButton>
        <Menu
          open={!!anchorElement}
          onClose={handleClose}
          anchorEl={anchorElement}
        >
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const Toolbar = styled(MaterialToolbar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  height: 50px;

  & path {
    fill: white;
  }

  & line {
    stroke: white;
  }
`;

export default Header;
