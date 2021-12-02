import React from 'react';
import GenericTable from './GenericTable';

class ServiceTable extends React.Component {
  render() {
    return (
      <GenericTable title="Services" dataPath="/services/" />
    );
  }
}

export default ServiceTable;
