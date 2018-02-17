import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Content.css';
import CoursePage from '../CoursePage/CoursePage';
import WelcomePage from '../WelcomePage/WelcomePage';
import PlanningPage from '../PlanningPage/PlanningPage';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={WelcomePage} />
        <Route path="/courses" component={CoursePage}/>
        <Route path="/planning" component={PlanningPage}/>
      </Switch>
    );
  }
}

export default Content;
