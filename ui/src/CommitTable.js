import React from 'react';
import GenericTable from './GenericTable';

function CommitTable(dataPath) {
    return (
        <>
            { dataPath.length > 0
                ? <GenericTable title="Commits" dataPath={dataPath}/> 
                : <GenericTable title="Commits" dataPath="/api/v1/commits"/>
            }
        </>
    );
}

export default CommitTable;
