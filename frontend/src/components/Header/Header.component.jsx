import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import SearchBox from "./SearchBox";
import { logout } from "../../redux/user/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = true;
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch();
  };

  return (
    <header className="header_area">
      <Container className="main-menu">
        <Navbar
          style={{ background: "transparent !important" }}
          className=" navbar_fixed"
          variant="dark"
          expand="lg"
          collapseOnSelect
        >
          <LinkContainer to="/">
            <Navbar.Brand>Arbab Hussain</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            className="navbar-toggler"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <div className="mr-auto"></div>
            <Nav className="navbar-nav">
              <li className="nav-item ">
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>

              <li className="nav-item ">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>

              <li className="nav-item ">
                <a className="nav-link" href="#portfolio">
                  portfolio
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#footer">
                  Contact Me
                </a>
              </li>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/work">
                    <NavDropdown.Item>Work</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
