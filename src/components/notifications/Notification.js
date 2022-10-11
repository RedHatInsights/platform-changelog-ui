import React, { useState, useContext } from 'react';
import { Alert, AlertActionLink, AlertActionCloseButton } from '@patternfly/react-core';

const TIMEOUT = 5000;
function Notification({ error, message }) {
    const [isClosed, setClosed] = useState(false);

    return <>
        {error && !isClosed && <Alert
            aria-label='notification'
            variant={error.type}
            title={error.title}
            timeout={TIMEOUT}
            actionLinks={error.message && 
                <AlertActionLink onClick={() => alert(error.message)}>Details</AlertActionLink>
            }
            actionClose={<AlertActionCloseButton onClose={() => setClosed(true)}/>}
        />}
        {message && !isClosed && <Alert
            aria-label='notification'
            variant={message.type}
            title={message.title}
            isInline
            timeout={TIMEOUT}
            actionClose={<AlertActionCloseButton onClose={() => setClosed(true)}/>}
        >
            {message.message}
        </Alert>}
    </>;
}

export default Notification;