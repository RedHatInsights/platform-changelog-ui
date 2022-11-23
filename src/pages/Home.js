import React from 'react';

import {
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';

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
        <div className='pc-c-page__content'>
            <PageSection variant={PageSectionVariants.light}>
                <TitleSection title="Gumbaroo" description="Global Changelog System for Console Dot Platform" />
            </PageSection>

            <PageSection>
                <ServiceTable />
            </PageSection>

            <PageSection>
                <CommitTable />
            </PageSection>

            <PageSection>
                <DeployTable />
            </PageSection>
        </div>
    )
}