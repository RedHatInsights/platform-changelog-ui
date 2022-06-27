import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

import ServiceTable from 'ServiceTable';

export default function Services() {
    return (
        <>
            <PageSection variant={PageSectionVariants.light} >
                <TextContent>
                    <Text component="h1">
                        Services
                    </Text>
                    <Text component="p">
                        Managed services monitored by Gumbaroo
                    </Text> 
                </TextContent>
            </PageSection>

            <ServiceTable />
        </>
    )
}