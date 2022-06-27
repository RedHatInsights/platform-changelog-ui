import React from 'react'; 

import { PageSection, Text, TextContent } from '@patternfly/react-core';

import { Link } from "react-router-dom";

import {
    TitleSection,
} from 'components';

export default function Error({error="Internal Error", description="Sorry for any inconvenience."}) {
    return (
        <TitleSection title={error} description={description}>
            <PageSection variant="light">
                <TextContent>
                    <Text className="centered">
                        Please head back to our <Link to="/">home page</Link>, and try again.
                    </Text>
                </TextContent>
            </PageSection>
        </TitleSection>
    )
}