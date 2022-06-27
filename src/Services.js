import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

import ServiceTable from 'ServiceTable';
import TitleSection from 'TitleSection';

export default function Services() {
    return (
        <>
            <TitleSection title="Services" description="Managed services monitored by Gumbaroo." />

            <ServiceTable />
        </>
    )
}