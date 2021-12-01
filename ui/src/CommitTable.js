import React from 'react';
import GenericTable from './GenericTable';

class CommitTable extends React.Component {
  render() {
    return (
      <GenericTable title="Commits" path="/commits/" />
    );
  }
}

export default CommitTable;
