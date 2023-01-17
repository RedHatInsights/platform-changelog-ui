import React from 'react';

import {
    PageSection,
} from '@patternfly/react-core';

import './Style.css';

import {
    TitleSection,
} from '../components';

import { CommitTable } from '../components/tables';

export default function Commits() {
    return (
        <div className='pc-c-page__content'>
            <PageSection>
                <TitleSection title="Commits" />

                <CommitTable noTitle={true} />
            </PageSection>
        </div>
        
    )
}
