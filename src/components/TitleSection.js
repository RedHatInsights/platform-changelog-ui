import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

export default function TitleSection({title, description, children=null}) {
    return (
        <PageSection variant={PageSectionVariants.light} >
            <TextContent>
                <Text component="h1">
                    {title}
                </Text>
                <Text component="p">
                    {description}
                </Text>
            </TextContent>
            {children}
        </PageSection>
    )
}