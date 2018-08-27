import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

export default class MyOffers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: cookie.load('userID') || 'user-id-not-available'
        }
    }

    render() {
        const { userId } = this.state;
        return (
            <div>
                {
                    userId === 'user-id-not-available'
                        ?
                        <div>
                            <h2>Please Login to access this page</h2>
                            <Link to='/'>click here to visit the home page.</Link>
                        </div>
                        : <div> User is logged in, display all the offers posted by user. User can delete/update any offer he or she has posted</div>
                }
            </div>
        );
    }
};