import React from 'react';
import GenericTable from './GenericTable';

function DeployTable(dataPath="api/v1/deploys") {
    return (
        <GenericTable title="Deploys" dataPath={dataPath}/>
    );
}

export default DeployTable;
