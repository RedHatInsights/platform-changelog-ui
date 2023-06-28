import React from 'react';

import {
    TextContent,
    Text
  } from "@patternfly/react-core";

import "./TitleSection.css";

export default function TitleSection({title, description, headingLevel="h1", children=null}) {
    return (
        <div className="header">
            <TextContent>
                <Text component={headingLevel}>
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