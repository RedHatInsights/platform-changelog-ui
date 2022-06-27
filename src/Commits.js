import CommitTable from 'CommitTable';
import React from 'react';

import TitleSection from 'TitleSection';

export default function Commits() {
    return (
        <>
            <TitleSection title="Commits" description="Complete commit logs for managed services." />
            
            <CommitTable />
        </>
        
    )
}