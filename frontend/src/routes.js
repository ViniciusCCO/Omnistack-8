import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
    return (
        // um parametro sera passado apos os dois pontos
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/dev/:id' component={Main} />
        </BrowserRouter>
    );
}