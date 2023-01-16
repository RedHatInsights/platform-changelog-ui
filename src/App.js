import React, { useEffect } from 'react';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

import '@patternfly/react-core/dist/styles/base.css';

import Page from './Page';
import { NotificationsPortal } from './components/notifications';
import { FilterManager } from 'components/filters';

function App() {
    const { updateDocumentTitle } = useChrome();

    useEffect(() => {
        updateDocumentTitle("platform-changelog", true);
    }, []);

    return (
        <NotificationsPortal>
            <FilterManager>
                <Page />
            </FilterManager>
        </NotificationsPortal>
    );
}

export default App;
