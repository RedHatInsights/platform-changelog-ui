import React from 'react';
import GenericTable from './GenericTable';

class CommitTable extends React.Component {
  render() {
    return (
      <GenericTable title="Commits" dataPath="api/v1/commits" />
    );
  }
}

export default CommitTable;
