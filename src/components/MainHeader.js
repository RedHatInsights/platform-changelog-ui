import React from 'react';
import {
  Brand,
  PageHeader,
} from '@patternfly/react-core';

import MainHeaderTools from './MainHeaderTools';

function MainHeader({ pathname }) {
    return (
        <PageHeader
            logo={<Brand src="/images/Masthead.png" alt="Gumbaroo" />}
            headerTools={<MainHeaderTools pathname={pathname} />}
            showNavToggle
        />
    );
}

export default MainHeader;

