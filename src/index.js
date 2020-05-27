
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './style/index.css';
import Task from './task';
import Intro from './intro';
import Consent from './consent';
import Questionnaires from './questionnaires';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Intro} exact />
                <Route path="/Consent" component={Consent} exact />
                <Route path="/Questionnaires" component={Questionnaires} exact />
                <Route path="/Task" component={Task} exact />
            </Switch>
        </BrowserRouter>
    );
}


ReactDOM.render(
  < App />,
  document.getElementById('root')
)
