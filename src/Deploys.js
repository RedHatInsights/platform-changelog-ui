import DeployTable from 'DeployTable';
import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

export default function Deploys() {
    return (
        <>
            <PageSection variant={PageSectionVariants.light} >
                <TextContent>
                    <Text component="h1">
                        Deploys
                    </Text>
                    <Text component="p">
                        Complete deployment logs for managed services
                    </Text> 
                </TextContent>
            </PageSection>

            <DeployTable />
        </>
    )
}