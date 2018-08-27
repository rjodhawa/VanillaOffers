import React, { Component } from 'react';
import './Home.css';
import cookie from 'react-cookies';
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            userId: cookie.load('userID') 
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/offers/all')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        if (this.state.error) {
            return <div>Error getting the offers: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading Offers...</div>
        } else {

            return (

                <div className="Home">
                    <div className="lander">
                        {
                            this.state.items.map(item => (
                                <div className ="Card">
                                {console.log(item)}
                                <h1>{item['RestaurantName']}</h1>
                                <h2>{item['Details']}</h2>
                                <h3>Daily Validity:{item['DailyStartTime']} to{item['DailyStopTime']} </h3>
                                <h4>{item['Location']}</h4>
                                <h5>Valid from: {item['ValidityFromDate']} to {item['ValidityToDate']}</h5>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }
    }
}