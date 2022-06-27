import React from 'react';

import CommitTable from 'CommitTable';
import DeployTable from 'DeployTable';
import ServiceTable from 'ServiceTable';
import TitleSection from 'TitleSection';

export default function Home() {
    return (
        <>
            <TitleSection title="Gumbaroo" description="Global Changelog System for Console Dot Platform" />

            <ServiceTable />
            <CommitTable />
            <DeployTable />
        </>
    )
}