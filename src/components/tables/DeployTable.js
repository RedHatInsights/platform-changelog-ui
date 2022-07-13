import React from 'react';
import GenericTable from './GenericTable';

function DeployTable({data=null, dataPath = "/api/v1/deploys"}) {
    return (
        <GenericTable title="Deploys" provideData={data} dataPath={dataPath}/>
    );
}

export default DeployTable;
