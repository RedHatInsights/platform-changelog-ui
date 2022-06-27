import DeployTable from 'DeployTable';
import React from 'react';

import TitleSection from 'TitleSection';

export default function Deploys() {
    return (
        <>
            <TitleSection title="Deploys" description="Complete deployment logs for managed services." />

            <DeployTable />
        </>
    )
}