import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';

import Page from './Page';
import { NotificationsPortal } from './components/notifications';

function App() {
    return (
        <NotificationsPortal>
            <Page />
        </NotificationsPortal>
    );
}

export default App;
