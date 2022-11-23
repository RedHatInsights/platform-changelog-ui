import React from 'react';

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text
  } from "@patternfly/react-core";

import "./TitleSection.css";

export default function TitleSection({title, description, children=null}) {
    return (
        <div className="header">
            <TextContent>
                <Text component="h1">
                    {title}
                </Text>
                <Text component="p">
                    {description}
                </Text>
            </TextContent>
            {children}
        </div>
    )
}