import React from 'react';

import {
    TitleSection,
} from 'components';

import { DeployTable } from 'components/tables';

export default function Deploys() {
    return (
        <>
            <TitleSection title="Deploys" description="Complete deployment logs for managed services." />

            <DeployTable />
        </>
    )
}