import React from 'react';
import GenericTable from './GenericTable';

class DeployTable extends React.Component {
  render() {
    return (
      <GenericTable title="Deploys" dataPath="/deploys/" />
    );
  }
}

export default DeployTable;
