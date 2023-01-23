import React from 'react';
import {
  Brand,
  PageHeader,
} from '@patternfly/react-core';

import Masthead from '../images/Masthead.png';

import MainHeaderTools from './MainHeaderTools';

function MainHeader({ isNavOpen, toggleNav, pathname }) {
    return (
        <PageHeader
            logo={<Brand src={Masthead} alt="Gumbaroo" />}
            headerTools={<MainHeaderTools pathname={ pathname } />}
            onNavToggle={ () => toggleNav(!isNavOpen) }
            showNavToggle
        />
    );
}

export default MainHeader;
