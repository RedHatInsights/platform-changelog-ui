import React from 'react';
import GenericTable from './GenericTable';

import { PageSection } from "@patternfly/react-core";

function DeployTable({data=null, dataPath = "/api/v1/deploys"}) {
    return (
        <PageSection>
            <GenericTable title="Deploys" data={data} dataPath={dataPath}/>
        </PageSection>
    );
}

export default DeployTable;
