import React, { Component } from 'react';
import Select from 'react-select';
import './PostOffers.css';
import TimeInput from 'react-time-input';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

const mainMenuOptionType = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'Drinks', label: 'Drinks & Nightlife' },
    { value: 'Takeout', label: 'Takeout' },
];

export default class PostOffers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            restaurantName: '',
            details: '',
            mainMenuOptionTypes: [],
            timeOfOfferValidity: '',
            Validity: '',
            userId: cookie.load('userID') || 'user-id-not-available'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newValue = event.value;
        let oldValue = this.state.mainMenuOptionTypes;

        oldValue.indexOf(newValue) === -1 ?
            oldValue.push(newValue) :
            oldValue.pop(newValue);

        console.log("Options selected:", oldValue);
        this.setState({
            mainMenuOptionTypes: oldValue
        });
    }

    handleTimeChange(event) {
        console.log(event);
    }
    render() {
        const { userId } = this.state;
        return (
            <div>
                {
                    userId !== 'user-id-not-available' ?
                        <div>
                            <label>Name:</label>
                            <input type="text" placeholder="Name" /> <br /><br />
                            <Select multi joinValues
                                value={this.state.mainMenuOptionTypes}
                                onChange={this.handleChange}
                                options={mainMenuOptionType}
                                placeholder={
                                    JSON.stringify(this.state.mainMenuOptionTypes) === '[]' ? "Select Menu Option Type" : JSON.stringify(this.state.mainMenuOptionTypes)
                                }
                            /><br />

                            <textarea placeholder="Enter some details about the offer"></textarea><br /><br />
                            <label>Select Locations for your restaurants</label>
                            <Select multi joinValues
                                value={this.state.mainMenuOptionTypes}
                                onChange={this.handleChange}
                                options={mainMenuOptionType}
                                placeholder={
                                    JSON.stringify(this.state.mainMenuOptionTypes) === '[]' ? "Select All the location, where this offer is valid" : JSON.stringify(this.state.mainMenuOptionTypes)
                                }
                            /><br />

                            <label>Daily Start Time:</label>
                            <TimeInput
                                initTime="10:10"
                                className='time-from'
                                ref="TimeInputWrapper"
                                mountFocus='true'
                                onTimeChange={this.onTimeChange}
                            />
                            <label>Daily End Time:</label>
                            <TimeInput
                                initTime="20:13"
                                className='time-to'
                                ref="TimeInputWrapper"
                                onTimeChange={this.onTimeChange}
                            />
                            <label>Offer valid from date</label>
                            <Flatpickr
                                options={{ minDate: Date() }}
                            />
                            <label>Offer valid to date</label>
                            <Flatpickr
                                options={{ minDate: Date() }}
                            />
                        </div> :
                        <div>
                            <h2>Please Login to access this page</h2>
                            <Link to='/'>click here to visit the home page.</Link>
                        </div>
                }
            </div>
        );
    }
};