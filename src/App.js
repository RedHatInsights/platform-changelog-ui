import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import AppPage from './Page';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
      return (
        <React.Fragment>
            <AppPage />
        </React.Fragment>
      );
  }
}

export default App;
