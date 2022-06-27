import React from 'react';

import {
    TitleSection,
} from 'components';

import {
    CommitTable,
    DeployTable,
    ServiceTable,
} from 'components/tables';

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