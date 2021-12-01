import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant
} from '@patternfly/react-table';

class GenericTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      path: props.path,
      title: props.title
    }
  }

  componentDidMount() {
    this.GetModel();
  }

  GetModel() {
    fetch(this.state.path).then(res => res.json()).then(data => {
      if (data.length > 0) {
        this.setState({
          columns: Object.keys(data[0]),
          rows: data.map(d => Object.values(d))
        });
      }
    });
  }

  render() {
    const rows = this.state.rows;
    const columns = this.state.columns;
    return (
      <Table caption={this.state.title} rows={rows} cells={columns} variant={TableVariant.compact}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default GenericTable;
