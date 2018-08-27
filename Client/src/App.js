import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import './App.css';
import GoogleLogin from 'react-google-login';
import cookie from 'react-cookies';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: cookie.load('userID') || 'user-id-not-available'
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin = function (userId) {
    if (userId['error'] === undefined) {
      this.setState({
        userId: userId['googleId']
      });
      cookie.save('userID', userId['googleId'], { path: '/' });
    }
    else {
      alert("Something wrong has seem to occured. Error Message: " + userId['error']);
    }
  }

  onLogout = function (response) {
    cookie.save('userID', 'user-id-not-available', { path: '/' });
    this.setState({
      userId: 'user-id-not-available'
    });
    window.location.reload();
  }

  render() {
    const { userId } = this.state
    return (

      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Vanilla Offers</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {
              userId === 'user-id-not-available'
                ? <div>
                  <Nav pullRight>
                    <NavItem>
                      <GoogleLogin
                        clientId="748055361932-ktqdl1jif4bog85h276458t2de1f5tjq.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.onLogin}
                        onFailure={this.onLogin}
                      />
                    </NavItem>
                  </Nav>
                </div>
                : <div>
                  <Nav pullRight>
                    <NavItem href="/myOffers">My Offers</NavItem>
                    <NavItem href="/postOffers">Post Offers</NavItem>
                    <NavItem>
                      <button onClick={
                        () => this.onLogout()
                      }>Logout</button>
                    </NavItem>
                  </Nav>

                </div>
            }
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={null} />
      </div>
    );
  }

}

export default App;