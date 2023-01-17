import React from 'react';

import {
    PageSection,
} from '@patternfly/react-core';

import {
    TitleSection,
} from '../components';

import "./Style.css";

import { ServiceTable } from '../components/tables';

export default function Services() {
    return (
        <div className='pc-c-page__content'>
            <PageSection>
                <TitleSection title="Services" description="Managed services monitored by Gumbaroo." />

                <ServiceTable />
            </PageSection>
        </div>
    )
}