import React from 'react';

import '@patternfly/react-core/dist/styles/base.css';

import Page from './Page';
import { NotificationsPortal } from './components/notifications';
import { FilterManager } from './components/filters';

function App() {
    return (
        <NotificationsPortal>
            <FilterManager>
                <Page />
            </FilterManager>
        </NotificationsPortal>
    );
}

export default App;
