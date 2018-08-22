import React, { Component } from 'react';
import './Home.css';
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
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
            return <div>Loading...</div>
        } else {

            return (

                <div className="Home">
                    <div className="lander">
                        {
                            this.state.items.map(item => (
                                <div className ="Card">
                                <h1>{item['RestaurantName']}</h1>
                                <h2>{item['Details']}</h2>
                                <h3>{item['TimeOfOfferValidityDaily']}</h3>
                                <h4>{item['Location'].map(eachLocation =>(
                                    <p>{eachLocation}</p>
                                ))
                                }</h4>
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