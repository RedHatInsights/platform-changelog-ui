import React from 'react';
import GenericTable from './GenericTable';

function CommitTable(dataPath="api/v1/commits") {
    return (
        <GenericTable title="Commits" dataPath={dataPath}/>
    );
}

export default CommitTable;
