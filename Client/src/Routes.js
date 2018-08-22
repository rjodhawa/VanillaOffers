import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';
import PostOffers from './containers/PostOffers';
import myOffer from './containers/MyOffers';
export default({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props = {childProps} />
        <AppliedRoute path="/postOffers" exact component={PostOffers} props = {childProps} />
        <AppliedRoute path="/myOffers" exact component={myOffer} props = {childProps} />
        <Route component={NotFound} />
    </Switch>