
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './style/index.css';
import Task from './task';
import Intro from './intro';
import Questionnaires from './questionnaires';
import End from './end';


const RefreshRoute = ({ component: Component, isDataAvailable, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       (props.location.state!==undefined) ? ( // if props location state is defined return page, else return to intro
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

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
