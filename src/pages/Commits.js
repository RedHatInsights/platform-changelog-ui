import React from 'react';

import {
    TitleSection,
} from 'components';

import { CommitTable } from 'components/tables';

export default function Commits() {
    return (
        <>
            <TitleSection title="Commits" description="Complete commit logs for managed services." />
            
            <CommitTable />
        </>
        
    )
}