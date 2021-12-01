import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant
} from '@patternfly/react-table';

class CommitTable extends React.Component {
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
    fetch('/commits/').then(res => res.json()).then(data => {
      if (data.length > 0) {
        this.setState({
          serviceColumns: Object.keys(data[0]),
          serviceRows: data.map(d => Object.values(d))
        });
      }
    });
  }

  render() {
    const serviceRows = this.state.serviceRows;
    const serviceColumns = this.state.serviceColumns;
    return (
      <Table caption="Commmits" rows={serviceRows} cells={serviceColumns} variant={TableVariant.compact}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default CommitTable;
