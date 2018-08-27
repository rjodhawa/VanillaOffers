import React, { Component } from 'react';
import Select from 'react-select';
import './PostOffers.css';
import TimeInput from 'react-time-input';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
            restaurantName: '',
            details: '',
            mainMenuOptionTypes: [],
            Location: [],
            DailyStartTime: '',
            DailyStopTime: '',
            ValidityFromDate: '',
            ValidityToDate: '',
            Status:'active',
            userId: cookie.load('userID') || 'user-id-not-available'
        };
        this.handleMainMenuOptionChange = this.handleMainMenuOptionChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOtherChanges = this.handleOtherChanges.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleStopTimeChange = this.handleStopTimeChange.bind(this);
        this.handleFromDateChanges = this.handleFromDateChanges.bind(this);
        this.handleToDateChanges = this.handleToDateChanges.bind(this);
    }

    handleMainMenuOptionChange(event) {
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

    handleLocationChange(event) {
        let newValue = event.value;
        let oldValue = this.state.mainMenuOptionTypes;

        oldValue.indexOf(newValue) === -1 ?
            oldValue.push(newValue) :
            oldValue.pop(newValue);

        console.log("Options selected:", oldValue);
        this.setState({
            Location: oldValue
        });
    }

    handleStartTimeChange(event) {
        this.setState({
            DailyStartTime: event
        });
    }
    handleStopTimeChange(event) {
        this.setState({
            DailyStopTime: event
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:4000/offers',{
            RestaurantName: this.state.restaurantName,
            Details: this.state.details,
            MainMenuOptionType: this.state.mainMenuOptionTypes,
            Location: this.state.Location,
            DailyStartTime: this.state.DailyStartTime,
            DailyStopTime: this.state.DailyStopTime,
            ValidityFromDate: this.state.ValidityFromDate,
            ValidityToDate: this.state.ValidityToDate,
            Status:this.state.Status,
            userID: cookie.load('userID')
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }
    handleFromDateChanges(selectedDates, dateStr){
        this.setState({
            ValidityFromDate: dateStr
        })
    }
    handleToDateChanges(selectedDates, dateStr){
        this.setState({
            ValidityToDate: dateStr
        })
    }
    handleOtherChanges(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        
    }
    render() {
        const { userId } = this.state;
        return (
            <div>
                {
                    userId !== 'user-id-not-available' ?
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <label>Name:</label>
                                <input type="text" name="restaurantName" 
                                    placeholder="Name" onBlur={this.handleOtherChanges} 
                                    /> <br /><br />
                                <Select multi joinValues
                                    value={this.state.mainMenuOptionTypes}
                                    onChange={this.handleMainMenuOptionChange}
                                    options={mainMenuOptionType}
                                    placeholder={
                                        JSON.stringify(this.state.mainMenuOptionTypes) === '[]' ? "Select Menu Option Type" : JSON.stringify(this.state.mainMenuOptionTypes)
                                    }
                                /><br />

                                <textarea name="details" onBlur={this.handleOtherChanges} placeholder="Enter some details about the offer"></textarea><br /><br />
                                <label>Select Locations for your restaurants</label>
                                <Select multi joinValues
                                    value={this.state.mainMenuOptionTypes}
                                    onChange={this.handleLocationChange}
                                    options={mainMenuOptionType}
                                    placeholder={
                                        JSON.stringify(this.state.mainMenuOptionTypes) === '[]' ? "Select All the location, where this offer is valid" : JSON.stringify(this.state.mainMenuOptionTypes)
                                    }
                                /><br />

                                <label>Daily Start Time:</label>
                                <TimeInput
                                    className='time-from'
                                    ref="TimeInputWrapper"
                                    onTimeChange={this.handleStartTimeChange}
                                />
                                <label>Daily End Time:</label>
                                <TimeInput
                                    className='time-to'
                                    ref="TimeInputWrapper"
                                    name="DailyStopTime"
                                    onTimeChange={this.handleStopTimeChange}
                                />
                                <label>Offer valid from date</label>
                                <Flatpickr
                                    
                                    onChange={this.handleFromDateChanges}
                                />
                                <label>Offer valid to date</label>
                                <Flatpickr
                                    
                                    onChange={this.handleToDateChanges}
                                /><br /><br />
                                <select name="Status" onBlur={this.handleOtherChanges}>
                                    <option value="active">Activate offer</option>
                                    <option value="inactive">Don't Activate offer</option>
                                </select><br /><br />
                                <input type="submit" value="Submit" /><br /><br />
                            </form>
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