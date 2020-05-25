import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import Book from './pages/Book';
import Category from './pages/Category';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/book/:title' component={Book}/>
                <Route exact path='/categories/:category' component={Category}/>
            </Switch>
        </BrowserRouter>
    )
}