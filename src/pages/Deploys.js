import React from 'react';

import {
    PageSection,
} from '@patternfly/react-core';

import {
    TitleSection,
} from 'components';

import { DeployTable } from 'components/tables';

export default function Deploys() {
    return (
        <div className='pc-c-page__content'>
            <PageSection>
                <TitleSection title="Deploys" />
                <DeployTable noTitle={true} />
            </PageSection>
        </div>
    )
}