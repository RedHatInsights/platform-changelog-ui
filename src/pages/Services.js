import React from 'react';

import {
    TitleSection,
} from 'components';

import { ServiceTable } from 'components/tables';

export default function Services() {
    return (
        <>
            <TitleSection title="Services" description="Managed services monitored by Gumbaroo." />

            <ServiceTable />
        </>
    )
}