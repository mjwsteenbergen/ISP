import * as React from 'react';
import './Header.css';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <h1 className="Title">IEP</h1>
        <Icon iconName="Education" />
      </div>
    );
  }
}

export default Header;
