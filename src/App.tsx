import * as React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
import Content from './pages/Content/Content';
// import CoursePage from './pages/CoursePage/CoursePage';

class App extends React.Component {

  componentWillMount() {
    initializeIcons();
  }

  render() {
    return (
      <Fabric>
        <div className="App">
            <Header/>
            <div className="Content">
              <Content/>
            </div>
            {/* <CoursePage/> */}
        </div>
      </Fabric>
    );
  }
}

export default App;
