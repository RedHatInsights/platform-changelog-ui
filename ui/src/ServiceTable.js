import React from 'react';
import GenericTable from './GenericTable';

class ServiceTable extends React.Component {
  render() {
    return (
      <GenericTable title="Services" path="/services/" />
    );
  }
}

export default ServiceTable;
