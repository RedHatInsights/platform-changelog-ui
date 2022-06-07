import React from 'react';
import GenericTable from './GenericTable';

class ServiceTable extends React.Component {
  render() {
    return (
      <GenericTable title="Services" dataPath="/api/v1/services" onNavChange={this.props.onNavChange} link />
    );
  }
}

export default ServiceTable;
