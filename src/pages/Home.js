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

// The home page needs some new content/stats
export default function Home() {
    return (
        <div className='pc-c-page__content'>
            <PageSection variant={PageSectionVariants.light}>
                <TitleSection title="Gumbaroo" description="Global Changelog System for Console Dot Platform" />
            </PageSection>

            <PageSection>
                <TitleSection title="Services" headingLevel="h3" />
                <ServiceTable />
            </PageSection>

            <PageSection>
                <TitleSection title="Recent Commits" headingLevel="h3" />
                <CommitTable />
            </PageSection>

            <PageSection>
                <TitleSection title="Recent Deployments" headingLevel="h3" />
                <DeployTable />
            </PageSection>
        </div>
    )
}