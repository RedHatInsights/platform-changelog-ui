import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
} from "@patternfly/react-core";

import CommitTable from 'CommitTable';
import DeployTable from 'DeployTable';
import ServiceTable from 'ServiceTable';

export default function Home() {
    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">
                        Gumbaroo
                    </Text>
                    <Text component="p">
                        Global Changelog System for Console Dot Platform
                    </Text> 
                </TextContent>
            </PageSection>

            <ServiceTable />
            <CommitTable />
            <DeployTable />
        </>
    )
}