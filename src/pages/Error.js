import React from 'react';

import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateSecondaryActions, Title } from '@patternfly/react-core';

import { Link } from "react-router-dom";

import { ExclamationCircleIcon } from '@patternfly/react-icons';

export default function Error({ error = "Internal Error", description = "Sorry for any inconvenience." }) {
    return (
        <EmptyState>
            <EmptyStateIcon icon={ExclamationCircleIcon} />
            <Title headingLevel="h4" size="lg">
                {error}
            </Title>
            <EmptyStateBody>
                {description}
            </EmptyStateBody>
            <Link to="/"><Button style={{
                marginTop: "32px",
            }} variant="primary">Return to home page</Button></Link>
            <EmptyStateSecondaryActions>
                <Link to="/services"><Button variant="link">Services</Button></Link>
                <Link to="/commits"><Button variant="link">Commits</Button></Link>
                <Link to="/deploys"><Button variant="link">Deploys</Button></Link>
            </EmptyStateSecondaryActions>
        </EmptyState>
    )
}