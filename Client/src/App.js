import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import './App.css';
import Routes from "./Routes";
import { LinkContainer } from 'react-router-bootstrap';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    let responseGoogle = response => {
      if (response['error'] === undefined) {
        // No error
        this.userHasAuthenticated(true);
      }
      else {
        alert("Something wrong has seem to occured. Error Message: " + response['error']);
      }
    }

    let logout = response => {
      console.log("User is logged out");
      this.userHasAuthenticated(false);
    }
    return (
      <div className="App container">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Vanilla Offers</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {
                this.state.isAuthenticated
                  ?<div> 
                    <NavItem>
                    <Link to="/postOffers">Post Offers</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/myOffers">My Offers</Link>
                  </NavItem>
                  <NavItem>
                    <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                  >
                  </GoogleLogout>
                  </NavItem>
                  </div>
                  : <LinkContainer to="/loginGoogle">
                    <NavItem>
                      <GoogleLogin
                        clientId="748055361932-ktqdl1jif4bog85h276458t2de1f5tjq.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                      />
                    </NavItem>
                  </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />

      </div>
    );
  }

}

export default App;
