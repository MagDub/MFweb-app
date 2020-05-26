
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './style/index.css';
import Task from './task';
import Intro from './intro';
import Consent from './consent';
import Survey from './survey';
import QuizBlock from './quizblock';


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Intro} exact />
                <Route path="/Consent" component={Consent} exact />
                <Route path="/Survey" component={Survey} exact />
                <Route path="/QuizBlock" component={QuizBlock} exact />
                <Route path="/Task" component={Task} exact />
            </Switch>
        </BrowserRouter>
    );
}


ReactDOM.render(
  < App />,
  document.getElementById('root')
)
