import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import ServiceTable from './ServiceTable';
import CommitTable from './CommitTable';

function App() {
  return (
    <React.Fragment>
      <ServiceTable />
      <CommitTable />
    </React.Fragment>
  );
}

export default App;
