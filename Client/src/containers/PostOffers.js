import React, { Component } from 'react';
import Select from 'react-select';
import './PostOffers.css';
import TimeInput from 'react-time-input';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
            Location: '',
            DailyStartTime: '',
            DailyStopTime: '',
            ValidityFromDate: '',
            ValidityToDate: '',
            Status: 'active',
            Lat: '',
            Lon: '',
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
        this.handleLocationSelect = this.handleLocationSelect.bind(this);
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
        if (this.state.mainMenuOptionTypes.length !== 0 & this.state.ValidityToDate !== '' &
            this.state.Location !== '' & this.state.ValidityFromDate !== '' &
            this.state.DailyStartTime !== '' & this.state.DailyStopTime !== '') {
            if (this.state.DailyStartTime >= this.state.DailyStopTime) {
                alert("Daily start time can not be after ending time")
            } else if (this.state.ValidityFromDate >= this.state.ValidityToDate) {
                alert("Start Date of the offer can not be after the end date");
            } else {
                axios.post('http://localhost:4000/offers', {
                    RestaurantName: this.state.restaurantName,
                    Details: this.state.details,
                    MainMenuOptionType: this.state.mainMenuOptionTypes,
                    Location: this.state.Location,
                    DailyStartTime: this.state.DailyStartTime,
                    DailyStopTime: this.state.DailyStopTime,
                    ValidityFromDate: this.state.ValidityFromDate,
                    ValidityToDate: this.state.ValidityToDate,
                    Status: this.state.Status,
                    userID: cookie.load('userID'),
                    Lat: this.state.Lat,
                    Lon: this.state.Lon
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            alert("Please fill out all the details before eubmitting the form");
        }
    }
    handleFromDateChanges(selectedDates, dateStr) {
        this.setState({
            ValidityFromDate: dateStr
        })
    }
    handleToDateChanges(selectedDates, dateStr) {
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
    handleLocationChange(address) {
        this.setState({
            Location: address
        });
    }
    handleLocationSelect(event) {
        geocodeByAddress(event)
            .then(results => getLatLng(results[0]))
            .then(LatLng => {
                console.log('success', LatLng)
                this.setState({
                    Lat: LatLng['lat'],
                    Lon: LatLng['lng'],
                    Location: event
                });
            })
            .catch(error => console.log('error', error));
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
                                <input type="text" name="restaurantName" required
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

                                <textarea required name="details" onBlur={this.handleOtherChanges} placeholder="Enter some details about the offer"></textarea><br /><br />
                                <label>Select Locations for your restaurants</label>
                                <PlacesAutocomplete
                                    value={this.state.Location}
                                    onChange={this.handleLocationChange}
                                    onSelect={this.handleLocationSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'location-search-input',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>

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