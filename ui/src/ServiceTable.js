import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  expandable
} from '@patternfly/react-table';

class ServiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceColumns: [],
      serviceRows: []
    }
  }

  componentDidMount() {
    this.GetServices();
  }

  GetServices() {
    fetch('/services/').then(res => res.json()).then(data => {
      this.setState({
        serviceColumns: Object.keys(data[0]),
        serviceRows: data.map(d => Object.values(d))
      });
    });
  }

  render() {
    const serviceRows = this.state.serviceRows;
    const serviceColumns = this.state.serviceColumns;
    return (
      <Table caption="Services" rows={serviceRows} cells={serviceColumns} variant={TableVariant.compact}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default ServiceTable;
