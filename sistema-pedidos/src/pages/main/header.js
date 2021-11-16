import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";
import useAuth from "../../hooks/auth";
import { HOME } from "../../routes";

const Header = () => {
  const { userInfo, logout } = useAuth();
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
          <Link to={HOME}>
            <Logo />
          </Link>
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
  max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  height: 50px;

  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  & line {
    stroke: ${({ theme }) => theme.palette.common.white};
  }
`;

export default Header;
