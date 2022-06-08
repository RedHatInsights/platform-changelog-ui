import React from 'react';
import GenericTable from './GenericTable';

function DeployTable(dataPath) {
    return (
        <>
            { dataPath.length > 0
                ? <GenericTable title="Deploys" dataPath={dataPath}/>
                : <GenericTable title="Deploys" dataPath={"/api/v1/deploys"}/>
            }
        </>
    );
}

export default DeployTable;
