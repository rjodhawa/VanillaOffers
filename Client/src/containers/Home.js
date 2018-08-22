import React, {Component} from 'react';
import './Home.css';

export default class Home extends Component{
    render(){
        return(
            <div className = "Home">
                <div className = "lander">
                    <h1>Vanilla Offers</h1>
                    <p>Your one stop destination to get all the offers around you</p>
                </div>
            </div>
        );
    }
}