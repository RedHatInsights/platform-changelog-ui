import CommitTable from 'CommitTable';
import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

export default function Commits() {
    return (
        <>
            <PageSection variant={PageSectionVariants.light} >
                <TextContent>
                    <Text component="h1">
                        Commits
                    </Text>
                    <Text component="p">
                        Complete commit logs for managed services
                    </Text> 
                </TextContent>
            </PageSection>
            
            <CommitTable />
        </>
        
    )
}