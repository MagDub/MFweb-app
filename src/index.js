
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './style/index.css';
import Task from './task';
import Intro from './intro';
import Questionnaires from './questionnaires';
import End from './end';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Intro} exact />
                <Route path="/Task" component={Task} exact />
                <Route path="/Questionnaires" component={Questionnaires} exact />
                <Route path="/End" component={End} exact />
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(
  < App />,
  document.getElementById('root')
)
