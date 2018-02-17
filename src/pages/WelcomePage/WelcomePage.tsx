import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';

class WelcomePage extends React.Component {
  render() {
    return (
        <div>
      <h1> Hi There!</h1>
      <Link href="/courses">To Courses</Link>
      </div>
    );
  }
}

export default WelcomePage;
